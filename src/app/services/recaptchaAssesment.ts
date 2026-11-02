import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise'

const client = new RecaptchaEnterpriseServiceClient()

async function createRecaptchaAssessment(token: string) {
  const projectID = process.env.RECAPTCHA_PROJECT_ID!
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const recaptchaAction = process.env.NEXT_PUBLIC_RECAPTCHA_ACTION_NAME

  const projectPath = client.projectPath(projectID)

  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaSiteKey
      }
    },
    parent: projectPath
  }

  const [response] = await client.createAssessment(request)

  if (!response.tokenProperties?.valid) {
    return null
  }

  if (response.tokenProperties?.action === recaptchaAction) {
    return response.riskAnalysis?.score
  } else {
    return null
  }
}

export { createRecaptchaAssessment }
