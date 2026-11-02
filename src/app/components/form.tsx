'use client'

import { Field, Form, Formik } from 'formik'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useState } from 'react'
import classNames from 'classnames'

import CustomSelect from './custom-select'
import Error from './error'
import Loading from './loading'
import Powered from './powered'

import Results from './results'

import { formData, initialValues } from '../constants'
import { FormValues, LabelValue } from '../types/index.d'

const GenerateForm = () => {
  const catOrDogRegex = new RegExp('cat|dog')
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [status, setStatus] = useState({
    isError: false,
    isLoading: false,
    isResult: false,
    stories: [],
    toneOfVoice: 'simple'
  })
  const generateBioText = status.isLoading ? 'generating profile' : 'generate profile'
  const generateTextAgain = `create another pet profile`

  const generateBio = async (values: FormValues) => {
    const token = await executeRecaptcha?.(process.env.NEXT_PUBLIC_RECAPTCHA_ACTION_NAME)

    const newStatus = {
      isError: false,
      isLoading: true,
      isResult: false,
      stories: []
    }

    setStatus(status => ({
      ...status,
      ...newStatus
    }))

    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, values })
    }).catch(
      () =>
        ({
          json: async () => ({ status: 200, stories: [], code: 408 })
        }) as Response
    )

    const data = await res.json()
    const { stories, code, status } = data

    if (stories?.length && status === 200) {
      const successStatus = {
        isLoading: false,
        isResult: true,
        stories,
        toneOfVoice: values.toneOfVoice
      }
      setStatus(status => ({
        ...status,
        ...successStatus
      }))
    } else {
      const errorStatus = {
        isError: true,
        isLoading: false
      }
      setStatus(status => ({
        ...status,
        ...errorStatus
      }))
    }
  }

  type ErrorProps = {
    petName?: string
    petType?: string
    pointOfView?: string
    toneOfVoice?: string
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={generateBio}
      validate={(values: FormValues) => {
        const errors: ErrorProps = {}
        if (!values.petName.trim()) {
          errors.petName = 'A pet name is required.'
        }
        if (!values.petType.trim()) {
          errors.petType = 'A pet type is required.'
        }
        if (!values.pointOfView.trim()) {
          errors.pointOfView = 'A point of view is required.'
        }
        if (!values.toneOfVoice.trim()) {
          errors.toneOfVoice = 'A tone of Voice is required.'
        }
        return errors
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => {
        return (
          <>
            <Form className="form font-base lg:w-10/12" id="w-form">
              <div className="container-rounded w-full py-8 lg:py-10">
                <div className="grid w-full grid-cols-1 px-10 lg:grid-cols-1 lg:gap-x-6">
                  <h3 className="w-10/12 lg:w-full">First, let&rsquo;s get some details.</h3>
                </div>
                <div className="mt-4 grid w-full grid-cols-1 px-10 lg:grid-cols-3 lg:gap-x-6">
                  <div className="input-with-label col-span-2">
                    <input
                      className={`w-full ${classNames({
                        error: errors.petName && touched.petName
                      })}`}
                      id="form-pet-name"
                      maxLength={25}
                      name="petName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Name of Pet"
                      type="text"
                      value={values.petName}
                    />
                    <label
                      className={`show-on-focus absolute left-0 top-0 ${
                        values.petName && 'active'
                      }`}
                      htmlFor="for-pet-name"
                    >
                      Name (required)
                    </label>
                    {errors.petName && touched.petName && (
                      <span className="error-input-text">* {errors.petName}</span>
                    )}
                  </div>
                </div>
                <div className="mt-2 grid w-full grid-cols-1 px-10 lg:mt-0 lg:grid-cols-3 lg:gap-x-6">
                  <div className="input-with-label">
                    <Field
                      className="dropdown"
                      component={CustomSelect}
                      isMulti={false}
                      name="petType"
                      options={formData.petType}
                      placeholder="Type of Pet"
                      setPetAgeOptions={(e: any) => {
                        if (values.petType !== '' && e?.value !== values.petType) {
                          setFieldValue('petAge', 'unknown')
                        }
                      }}
                    />
                    {errors.petType && touched.petType && (
                      <span className="error-input-text">* {errors.petType}</span>
                    )}
                  </div>
                  <div className="input-with-label">
                    <Field
                      className={values.petAge === '' ? 'placeholder' : ''}
                      component={CustomSelect}
                      isMulti={false}
                      name="petAge"
                      options={
                        values.petType === 'cat'
                          ? formData.petAge.cat
                          : values.petType === 'dog'
                          ? formData.petAge.dog
                          : formData.petAge.other
                      }
                      placeholder="Age"
                    />
                  </div>
                  <div className="input-with-label">
                    <Field
                      className={values.petGender === '' ? 'placeholder' : ''}
                      component={CustomSelect}
                      isMulti={false}
                      name="petGender"
                      options={formData.petGender}
                      setPetOptions={() => {}}
                      placeholder="Gender"
                    />
                  </div>
                </div>
                <div className="mt-8 grid w-full grid-cols-1 lg:mt-5 lg:grid-cols-1 lg:gap-x-6">
                  <div
                    id="form-pet-personality-traits"
                    className="cell w-full flex-col"
                  >
                    <div
                      role="group"
                      aria-labelledby="form-pet-personality-traits"
                      className="px-10"
                    >
                      <p className="text-base leading-8 lg:text-[1.375rem]">
                        Traits (select all that apply)
                      </p>
                      <div className="mt-3 grid w-full grid-cols-2 gap-x-0 lg:mt-4 lg:grid-cols-10">
                        {formData.petPersonalityTraits.map((trait: LabelValue, i: number) => (
                          <div
                            key={`group-${i}`}
                            className="lg:col-span-2"
                          >
                            <label
                              className="flex items-center px-1 py-2"
                              key={`${trait.value}-${i}`}
                            >
                              <Field
                                type="checkbox"
                                name="petPersonalityTraits"
                                value={trait.value}
                              />
                              <span className="ml-3 text-base">{trait.label}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 grid w-full grid-cols-1 px-10 lg:mt-5 lg:grid-cols-3 lg:gap-x-6">
                      <div className="input-with-label col-span-2">
                        <input
                          className="w-full"
                          id="for-pet-personality-traits-custom"
                          maxLength={125}
                          name="petPersonalityTraitsCustom"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={formData.petPersonalityTraitsCustom.label}
                          type="text"
                          value={values.petPersonalityTraitsCustom}
                        />
                        <label
                          className={`show-on-focus absolute left-0 top-0 ${
                            values.petPersonalityTraitsCustom && 'active'
                          }`}
                          htmlFor="for-pet-personality-traits-custom"
                        >
                          What else makes them special? (optional)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row flex w-10/12 flex-wrap  lg:mt-5  lg:w-full lg:gap-x-5 lg:px-10">
                  <hr className="my-4 w-full border border-white lg:my-0" />
                  <h3 className="mt-6 w-3/4 md:mt-10 lg:w-full">
                    What type of pet profile would you like?
                  </h3>
                </div>
                <div className="mt-0 grid w-full grid-cols-1 px-10 lg:mt-8 lg:grid-cols-3 lg:gap-x-6">
                  <div className="cell mt-8  flex-col lg:mt-0">
                    <Field
                      className={values.toneOfVoice === '' ? 'placeholder' : ''}
                      component={CustomSelect}
                      isMulti={false}
                      name="toneOfVoice"
                      options={formData.tonesOfVoice}
                      placeholder="Tone of Voice"
                    />
                  </div>
                  <div
                    className="cell mt-8 flex-col lg:mt-0"
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    <Field
                      className={values.pointOfView === '' ? 'placeholder' : ''}
                      component={CustomSelect}
                      name="pointOfView"
                      placeholder="Point of View"
                      isMulti={false}
                      options={formData.pointsOfView}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-10 flex w-full flex-col items-center justify-center lg:mt-16">
                <button
                  className="btn btn-secondary px-5 lg:w-fit"
                  type="submit"
                  disabled={
                    !values.petName ||
                    !values.petType ||
                    !values.pointOfView ||
                    !values.toneOfVoice ||
                    isSubmitting
                  }
                >
                  {status.isResult && values.toneOfVoice === status.toneOfVoice
                    ? generateTextAgain
                    : generateBioText}
                </button>
              </div>
            </Form>
            <div className="w-full lg:w-10/12">
              {status.isLoading && <Loading />}
              {status.isResult && (
                <Results
                  handleSubmit={handleSubmit}
                  stories={status.stories}
                  toneOfVoice={values.toneOfVoice}
                />
              )}
              {status.isError && <Error />}
            </div>
          </>
        )
      }}
    </Formik>
  )
}

export default GenerateForm
