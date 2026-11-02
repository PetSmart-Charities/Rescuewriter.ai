import { useState } from 'react'

type CopyProps = {
  text: string
}

const CopyToClipboard = ({ text }: CopyProps) => {
  const [copyText, setCopyText] = useState('copy your pet profile')
  return (
    <button
      className="link mt-6 self-start justify-self-start text-left text-lg text-white lg:mt-10 hover:text-psc-gray"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopyText('Copied!')
        setTimeout(() => {
          setCopyText('copy your pet profile')
        }, 2000)
      }}
    >
      {copyText}
    </button>
  )
}

export default CopyToClipboard
