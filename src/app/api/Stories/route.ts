import { NextResponse } from 'next/server'
import type { AxiosResponse } from 'axios'
import { OpenAI } from 'openai'

import { ResponseStatus, OpenAIModerationCategory } from '../../constants'
import { apiErrors } from '../../constants/errors'
import { verifyRecaptcha } from '../../services/recaptchaAssesmentBackEnd'
import bannedCheck, { BannedCategory } from '../../utils/bannedCheck'
import profanityCheck from '../../utils/profanityCheck'

export async function POST(request: Request) {  
  try {
    // Check environment variables first
    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OPENAI_API_KEY environment variable')
      return NextResponse.json({
        code: ResponseStatus.AppError,
        error: 'OpenAI API key not configured',
        status: 500
      })
    }

    if (!process.env.GOOGLE_CLOUD_API_KEY) {
      console.error('Missing GOOGLE_CLOUD_API_KEY environment variable')
      return NextResponse.json({
        code: ResponseStatus.AppError,
        error: 'Google Cloud API key not configured',
        status: 500
      })
    }

    if (!process.env.RECAPTCHA_PROJECT_ID) {
      console.error('Missing RECAPTCHA_PROJECT_ID environment variable')
      return NextResponse.json({
        code: ResponseStatus.AppError,
        error: 'Recaptcha project ID not configured',
        status: 500
      })
    }

    const aiModel = 'gpt-4-turbo'

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    let data: any
    try {
      data = await request.json()
    } catch (error) {
      console.error('Failed to parse request JSON:', error)
      return NextResponse.json({
        code: ResponseStatus.BadParams,
        error: 'Invalid JSON in request body',
        status: 400
      })
    }

    const { token, values } = data

    if (!token || !values) {
      console.error('Missing token or values in request')
      return NextResponse.json({
        code: ResponseStatus.BadParams,
        error: 'Missing token or values',
        status: 400
      })
    }

    const {
      petAge,
      petName,
      petType,
      petGender,
      petPersonalityTraits,
      petPersonalityTraitsCustom,
      pointOfView,
      toneOfVoice
    } = values

    const petPersonalityTraitsClean = petPersonalityTraits.filter((trait: string) => trait.length)

    const isSimple = toneOfVoice.trim().toLowerCase() === 'simple'
    const storyMaxCharacters = 600

    const tankOrShelter = petType !== 'fish' ? 'shelter' : 'fish tank'

    const aiRole = `You're an author of ${toneOfVoice} ${
      isSimple ? 'fact-based' : ''
    } stories about ${tankOrShelter} pets.`

    const promptAge =
      petAge !== 'unknown' ? `${petName} is ${petAge}. ` : 'Do not mention the age of the pet. '

    const promptShelterArrival = isSimple
      ? `Do not mention how ${petName} arrived at the ${tankOrShelter}.`
      : `Include a ${toneOfVoice} story about how ${petName} ended up at the ${tankOrShelter}.`

    const promptSubject = `${
      petGender || petName + ' is a'
    }  ${petType} living in a ${tankOrShelter}. ${promptAge}`
    const promptTraits = petPersonalityTraits.length
      ? `${petName} is ${petPersonalityTraitsClean.join(', ')}.`
      : ''
    const promptTraitsCustom = petPersonalityTraitsCustom.length
      ? `${petPersonalityTraitsCustom}.`
      : ''

    const promptShared = `Write a ${storyMaxCharacters} character count blurb about ${petName}. ${promptSubject} ${promptTraits} ${promptTraitsCustom} `
    const promptPov =
      pointOfView === 'pet' ? `Write the story in the first-person voice of ${petName}.` : ''

    const promptGuidelines = `Don't mention death or storms. Don't include references to the pet's appearance or how long they've been at the ${tankOrShelter}. End the story with a blurb about why ${petName} should be adopted. Don't speak about topics that involve race, ethnicity, politics or religion. Follow these rules: 1. Does the story involve topics that reference race, ethnicity, politics or religion? If yes, then state "Rule broken", the reason, and the story in quotes.`

    const promptResponseFormat = `Condense the story to as close to but under ${storyMaxCharacters} characters, and return it in a valid JSON-like array: [{"count": ${storyMaxCharacters}, "story": "text for ${storyMaxCharacters} character story"}]. Make sure its valid JSON`

    const finalPrompt =
      `${promptShared} ${promptPov} ${promptShelterArrival} ${promptGuidelines} ${promptResponseFormat}.`.replace(
        /\s+/g,
        ' '
      )

    const errorValuesMissing = !petName || !petType || !toneOfVoice || !pointOfView || !token

    const errorValueType =
      typeof petName !== 'string' ||
      typeof petType !== 'string' ||
      typeof petPersonalityTraitsCustom !== 'string' ||
      typeof pointOfView !== 'string' ||
      typeof toneOfVoice !== 'string' ||
      typeof token !== 'string'

    const errorValueLength =
      petName.length > 50 ||
      petType.length > 50 ||
      petPersonalityTraitsCustom.length > 85 ||
      pointOfView.length > 50 ||
      toneOfVoice.length > 30

    if (errorValuesMissing || errorValueType || errorValueLength) {
      return NextResponse.json({
        code: ResponseStatus.BadParams,
        error: apiErrors.generic,
        status: 400
      })
    }

    const score = await verifyRecaptcha(token)

    if (!score || typeof score !== 'number') {
      throw new Error('Recaptcha API Error')
    }

    const isRobot = !score || score < parseFloat(process.env.RECAPTCHA_SCORE_LIMIT ?? '0.9')

    if (isRobot) {
      console.log('bot detected')
      return NextResponse.json({
        code: ResponseStatus.RobotDetected,
        error: apiErrors.generic,
        status: 400
      })
    }

    let responseModeration

    try {
      responseModeration = await openai.moderations.create({
        input: finalPrompt
      })
    } catch (error) {
      throw new Error('Moderation API Error')
    }

    const OpenAIModeration = responseModeration.results[0]
    const isObscene = OpenAIModeration?.flagged

    if (isObscene) {
      let obsceneCategory: BannedCategory | null = null

      if (OpenAIModeration) {
        Object.entries(OpenAIModeration.categories).forEach(([moderationCategory, isFlagged]) => {
          if (isFlagged) {
            switch (moderationCategory) {
              case OpenAIModerationCategory.Hate:
              case OpenAIModerationCategory.HateThreatening:
                obsceneCategory = BannedCategory.Hate
                break
              case OpenAIModerationCategory.SelfHarm:
              case OpenAIModerationCategory.Violence:
              case OpenAIModerationCategory.ViolenceGraphic:
                obsceneCategory = BannedCategory.Violence
                break
              case OpenAIModerationCategory.Sexual:
              case OpenAIModerationCategory.SexualMinors:
                obsceneCategory = BannedCategory.Sexual
                break
              default:
                break
            }
          }
        })
      }

      const statusCode = `${ResponseStatus.ModerationOpenAI}${obsceneCategory?.[0] ?? ''}`

      return NextResponse.json({ status: 200, stories: [], code: statusCode })
    }

    const petNameBanned = bannedCheck(petName.toLowerCase())
    const petPersonalityTraitsCustomBanned = bannedCheck(petPersonalityTraitsCustom.toLowerCase())
    const petTypeBanned = bannedCheck(petType.toLowerCase())
    const pointOfViewBanned = bannedCheck(pointOfView.toLowerCase())
    const toneOfVoiceBanned = bannedCheck(toneOfVoice.toLowerCase())

    if (
      petNameBanned ||
      petPersonalityTraitsCustomBanned ||
      petTypeBanned ||
      pointOfViewBanned ||
      toneOfVoiceBanned
    ) {
      const statusCode = `${ResponseStatus.ModerationRequestRawFilter}${
        petNameBanned?.[0] ??
        petPersonalityTraitsCustomBanned?.[0] ??
        petTypeBanned?.[0] ??
        pointOfViewBanned?.[0] ??
        toneOfVoiceBanned?.[0] ??
        ''
      }`

      return NextResponse.json({ status: 200, stories: [], code: statusCode })
    }

    const petNameProfanityBanned = profanityCheck(petName.toLowerCase())
    const petPersonalityTraitsCustomProfanityBanned = profanityCheck(petType.toLowerCase())
    const petTypeProfanityBanned = profanityCheck(petType.toLowerCase())
    const pointOfViewProfanityBanned = profanityCheck(pointOfView.toLowerCase())
    const toneOfVoiceProfanityBanned = profanityCheck(toneOfVoice.toLowerCase())

    if (
      petNameProfanityBanned ||
      petTypeProfanityBanned ||
      petPersonalityTraitsCustomProfanityBanned ||
      pointOfViewProfanityBanned ||
      toneOfVoiceProfanityBanned
    ) {
      const statusCode = `${ResponseStatus.ModerationRequestTrieFilter}${
        petNameProfanityBanned?.[0] ??
        petTypeProfanityBanned?.[0] ??
        petPersonalityTraitsCustomProfanityBanned?.[0] ??
        pointOfViewProfanityBanned?.[0] ??
        toneOfVoiceProfanityBanned?.[0] ??
        ''
      }`

      return NextResponse.json({ status: 200, stories: [], code: statusCode })
    }

    let response
    let retriesOpenAI = 0

    try {
      console.log('attempting to create completion')

      response = await openai.chat.completions.create({
        model: aiModel,
        messages: [
          { role: 'system', content: aiRole },
          {
            role: 'user',
            content: finalPrompt
          }
        ],
        temperature: 0.6,
        max_tokens: 1000,
        top_p: 0.7,
        n: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })

      console.log(response.choices?.[0]?.message?.content)
    } catch (error) {
      console.log(error)
      throw new Error('OpenAI Create Completion API Error')
    }

    const responseText = response.choices?.[0]?.message?.content || ''

    const storiesCreated = JSON.parse(
      responseText
        ?.trim()
        .replace(/\r?\n|\r|\s\s/g, '')
        .trim() || ''
    )

    if (storiesCreated) {
      if (responseText.toLowerCase().includes('rule broken')) {
        const statusCode = ResponseStatus.ModerationAiPrompt

        return NextResponse.json({ status: 200, stories: [], code: statusCode })
      }

      const rawAfterCheck = bannedCheck(responseText.toLowerCase())

      if (rawAfterCheck) {
        const statusCode = `${ResponseStatus.ModerationResponseRawFilter}${
          rawAfterCheck?.[0] ?? ''
        }`

        return NextResponse.json({ status: 200, stories: [], code: statusCode })
      }

      const profanityAfterCheck = profanityCheck(responseText.toLowerCase())

      if (profanityAfterCheck) {
        const statusCode = `${ResponseStatus.ModerationResponseTrieFilter}${
          profanityAfterCheck?.[0] ?? ''
        }`

        return NextResponse.json({ status: 200, stories: [], code: statusCode })
      }

      const statusCode = ResponseStatus.FactGenerated

      return NextResponse.json({
        code: ResponseStatus.FactGenerated,
        status: 200,
        stories: storiesCreated
      })
    } else {
      const statusCode = ResponseStatus.FactNotFound

      return NextResponse.json({ status: 200, stories: [], code: statusCode })
    }
  } catch (error) {
    console.error('Unhandled error in stories API:', error)
    return NextResponse.json({
      code: ResponseStatus.AppError,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500
    })
  }
}
