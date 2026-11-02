import { Fragment, FormEvent, useState, useEffect, useRef } from 'react'

import Typewriter from 'typewriter-effect'

import CopyToClipboard from './copy-to-clipboard'
import { StoryProps, FormValues, LabelValue } from '../types/index.d'

const Result = ({ story }: any) => {
  const resultRef = useRef<HTMLTextAreaElement>(null)
  const [userStory, setUserStory] = useState(story)

  useEffect(() => {
    if (resultRef.current !== null) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' })
      resultRef.current.style.height = 'auto'
      resultRef.current.style.height = `${resultRef.current.scrollHeight}px`
    }
  }, [story])

  return (
    <>
      <div className="mt-12 w-full  rounded-lg bg-white p-10 text-black lg:mt-16">
        <p className="label text-psc-count">{userStory.length} characters</p>
        <div className="result mt-3 w-full appearance-none bg-white text-[1.375rem] leading-8 focus:border-0 focus:border-black focus:outline-none">
          <textarea
            ref={resultRef}
            className="result mt-3 w-full appearance-none bg-white leading-8 focus:border-0 focus:border-black focus:outline-none"
            defaultValue={userStory}
            onChange={() => {
              if (resultRef.current !== null) {
                setUserStory(resultRef.current.value)
              }
            }}
          />
        </div>
      </div>
      <CopyToClipboard text={userStory} />
    </>
  )
}

type story = {
  count: number
  story: string
}
interface ResultsProps {
  stories: story[]
  handleSubmit: any
  toneOfVoice: string
}

const Results = ({ stories, handleSubmit, toneOfVoice }: ResultsProps) => (
  <div className="mt-20 flex flex-col items-center bg-psc-red p-10 text-white">
    <p className="mt-5 text-center text-[1.375rem] font-normal leading-8 lg:w-9/12">
      Our AI occasionally gets the zoomies making it a little too creative. Feel free to tweak.
    </p>
    {stories.map((story: StoryProps, i: number) => (
      <Fragment key={`result.count-${i}`}>
        <Result story={story.story} />
      </Fragment>
    ))}
  </div>
)

export default Results
