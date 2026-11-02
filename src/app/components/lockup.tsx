import Image from 'next/image'
import React, { useRef } from 'react'
import Link from 'next/link'

import Lottie from 'react-lottie-player'

import LogoAnimation from '../../../public/animations/psc-lockup.json'
import LogoAnimationM from '../../../public/animations/psc-lockup-m.json'

interface LockUpProps {
  animate?: boolean
  subhead?: boolean
}

const Lockup = ({ animate, subhead = true }: LockUpProps) => {
  const lottieRef = useRef<any>(null)
  return (
    <header className="flex w-full flex-col items-center justify-center">
      <section className="flex w-full justify-center border-b-4 border-b-psc-hr px-10 pb-9 pt-10">
        <Link
          href="https://petsmartcharities.org/"
          target="_blank"
          title="PetSmart Charities"
        >
          <Image
            alt="PetSmart Charities"
            className="w-[132px] lg:w-auto"
            height="49"
            width="159"
            src="/img/psc-logo.svg"
          />
        </Link>
      </section>

      <section className="grid-template-columns: repeat(12, minmax(0, 1fr)) mt-10 w-full max-w-5xl">
        <div className="flex w-full justify-center text-center">
          <h1 className="mb-8 w-full flex-col items-center justify-center lg:w-6/12">
            <Link href="/">
              <div
                className="mx-auto flex h-[193px] w-[191px] justify-center lg:hidden"
                style={{ transform: 'translate3d()' }}
              >
                <Lottie
                  animationData={LogoAnimationM}
                  id="lockup-a-m"
                  renderer="canvas"
                  loop={false}
                  play
                />
              </div>
              <div className="hidden h-[187px] w-[506px] lg:block">
                <Lottie
                  loop={true}
                  renderer="canvas"
                  ref={lottieRef}
                  animationData={LogoAnimation}
                  play
                  id="lockup-a"
                  onMouseEnter={() => {
                    if (lottieRef.current !== null && lottieRef.current.isPaused) {
                      lottieRef.current.togglePause()
                    }
                  }}
                  onLoopComplete={() => {
                    lottieRef.current.togglePause()
                  }}
                />
              </div>
            </Link>
          </h1>
        </div>
        {subhead && (
          <div className=" mt-6 flex justify-center text-center">
            <p className="w-10/12 font-body text-[1.375rem] leading-8 lg:w-9/12 lg:text-[1.625rem]">
              A pet&rsquo;s backstory can inspire a person to adopt them, but they&rsquo;re often
              left blank. That&rsquo;s why PetSmart Charities created an AI tool to help volunteers,
              staff and fosters craft compelling pet profiles instantly.
            </p>
          </div>
        )}
      </section>
    </header>
  )
}

export default Lockup
