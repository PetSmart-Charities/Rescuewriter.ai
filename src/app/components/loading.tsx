import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import Lottie from 'react-lottie-player'

import loadingAnimation from '../../../public/animations/psc-loading.json'

interface AnimationState {
  direction: number
  isStopped: boolean
}

const Loading = () => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    direction: 1,
    isStopped: false
  })

  const loadingEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loadingEl.current) {
      loadingEl.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div
        className=" w-36 lg:w-64"
        ref={loadingEl}
      >
        <Lottie
          animationData={loadingAnimation}
          play
          loop={true}
        />
      </div>
    </div>
  )
}

export default Loading
