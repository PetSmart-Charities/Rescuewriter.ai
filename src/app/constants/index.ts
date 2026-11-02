import { FormValues } from '../types'

export enum ResponseStatus {
  AppError = 'F',
  BadParams = '0',
  FactGenerated = '4',
  FactNotFound = '6',
  ModerationAiPrompt = '5',
  ModerationOpenAI = '2',
  ModerationRequestRawFilter = '3',
  ModerationRequestTrieFilter = '7',
  ModerationResponseRawFilter = '8',
  ModerationResponseTrieFilter = '9',
  RobotDetected = '1'
}

export enum OpenAIModerationCategory {
  Hate = 'hate',
  HateThreatening = 'hate/threatening',
  SelfHarm = 'self-harm',
  Sexual = 'sexual',
  SexualMinors = 'sexual/minors',
  Violence = 'violence',
  ViolenceGraphic = 'violence/graphic'
}

export const formData = {
  petAge: {
    cat: [
      { label: 'Kitten', value: 'a kitten' },
      { label: 'Young', value: 'young' },
      { label: 'Adult', value: 'an adult' },
      { label: 'Senior', value: 'a senior' },
      { label: 'Unknown', value: 'unknown' }
    ],
    dog: [
      { label: 'Puppy', value: 'a puppy' },
      { label: 'Young', value: 'young' },
      { label: 'Adult', value: 'an adult' },
      { label: 'Senior', value: 'a senior' },
      { label: 'Unknown', value: 'unknown' }
    ],
    other: [
      { label: 'Young', value: 'young' },
      { label: 'Adult', value: 'an adult' },
      { label: 'Senior', value: 'a senior' },
      { label: 'Unknown', value: 'unknown' }
    ]
  },
  petGender: [
    { label: 'Male', value: "He's a" },
    { label: 'Female', value: "She's a" },
    { label: "Don't know", value: "they're a" }
  ],
  tonesOfVoice: [
    { label: 'Heartfelt', value: 'simple' },
    { label: 'Comedic', value: 'comedic' },
    { label: 'Heroic', value: 'comic book superhero' },
    { label: 'Magical', value: 'magical' }
  ],
  petType: [
    { label: 'Dog', value: 'dog' },
    { label: 'Cat', value: 'cat' },
    { label: 'Rabbit', value: 'rabbit' },
    { label: 'Hamster', value: 'hamster' },
    { label: 'Guinea Pig', value: 'guinea pig' },
    { label: 'Bird', value: 'bird' },
    { label: 'Turtle', value: 'turtle' },
    { label: 'Fish', value: 'fish' }
  ],
  petPersonalityTraits: [
    { label: 'Sweet', value: 'sweet' },
    { label: 'Curious', value: 'curious' },
    { label: 'Brave', value: 'brave' },
    { label: 'Smart', value: 'smart' },
    { label: 'Cuddly', value: 'cuddly' },
    { label: 'Friendly', value: 'friendly' },
    { label: 'Goofy', value: 'goofy' },
    { label: 'Mellow', value: 'mellow' },
    { label: 'Playful', value: 'playful' },
    { label: 'Loyal', value: 'loyal' },
    { label: 'Independent', value: 'independent' },
    { label: 'Gentle', value: 'gentle' },
    { label: 'Funny', value: 'funny' },
    { label: 'Energetic', value: 'energetic' },
    { label: 'Shy', value: 'shy' }
  ],
  petPersonalityTraitsCustom: {
    label: 'What else makes them special? (optional)',
    value: ''
  },
  pointsOfView: [
    { label: 'From the Pet', value: 'pet' },
    { label: 'From You', value: 'human' }
  ]
}

export const initialValues: FormValues = {
  petAge: '',
  petGender: '',
  petName: '',
  petPersonalityTraits: [''],
  petPersonalityTraitsCustom: '',
  petType: '',
  pointOfView: '',
  toneOfVoice: ''
}
