import Image from 'next/image'

const Error = () => (
  <div className="mt-10 flex flex-col items-center">
    <Image
      className="h-[auto] w-28 lg:w-48"
      src="/img/psc-try-again.svg"
      alt="Try again"
      width={168}
      height={190}
    />
    <h3 className="mt-10 text-center">Apologies, we had trouble fetching your story.</h3>
  </div>
)

export default Error
