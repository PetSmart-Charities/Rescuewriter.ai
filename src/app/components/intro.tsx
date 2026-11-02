import Image from 'next/image'
import Link from 'next/link'

import Examples from './examples'
import Powered from './powered'

const Intro = () => (
  <>
    <div className="flex w-full flex-col items-center text-center">
      <div className="flex w-full flex-col items-center">
        <Link
          href="/generate"
          className="btn btn-primary w-6/12 lg:w-[12.5rem]"
        >
          get started
        </Link>
      </div>
    </div>
    <div className="container-rounded alt mt-14 w-full py-8 lg:w-10/12 lg:p-10 ">
      <Image
        alt="A round, red icon with red heart in the middle."
        height="33"
        src="/img/heart-icon.svg"
        width="32"
      />
      <h2 className="mt-5 text-center">Generate pet profiles like these:</h2>
      <Examples />
    </div>
  </>
)

export default Intro
