import { FieldProps } from 'formik'
import Select, { Options } from 'react-select'

export interface FormValues {
  petAge: '' | 'unknown' | 'a kitten' | 'a puppy' | 'young' | 'an adult' | 'a senior'
  petGender: '' | 'he' | 'she' | 'they'
  petName: string
  petPersonalityTraits?: [
    | ''
    | 'brave'
    | 'cuddly'
    | 'curious'
    | 'energetic'
    | 'friendly'
    | 'funny'
    | 'gentle'
    | 'goofy'
    | 'independent'
    | 'loyal'
    | 'mellow'
    | 'playful'
    | 'shy'
    | 'smart'
    | 'sweet'
    | 'talkative'
  ]
  petPersonalityTraitsCustom: string
  petType: '' | 'dog' | 'cat' | 'rabbit' | 'hamster' | 'guinea pig' | 'bird' | 'turtle' | 'fish'
  pointOfView: '' | 'human' | 'pet'
  toneOfVoice: '' | 'comic book superhero' | 'comedic' | 'magical' | 'simple'
}

export interface LabelValue {
  label: string
  value: string
}

interface Option {
  label: string
  value: string
}

interface CustomSelectProps extends FieldProps {
  className?: string
  currentValue?: string
  isMulti?: boolean
  options: Options<Option>
  placeholder?: string
  required?: boolean
  setPetAgeOptions?: (e: any) => void
}

interface Option {
  label: string
  value: string
}

interface MultiSelectProps extends FieldProps {
  className?: string
  isMulti?: boolean
  options: Options<Option>
  placeholder?: string
}

interface ApiErrorsProps {
  generic: string
  moderated: string
}

interface ResponseData {
  story?: string
  code: string
  counter?: number
  error?: string
  guid?: string
}

interface RequestData {
  token?: string
  values: FormValues
}

export interface FormErrors {
  petName?: string
  petType?: string
}

export interface StoryProps {
  count: number | string
  story: string
}
