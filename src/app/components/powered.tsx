import Image from 'next/image'

interface PoweredProps {
  className?: string
}

const Powered = ({ className }: PoweredProps) => (
  <p className={className}>
    Powered by{' '}
    <a
      href="https://www.deutschla.com"
      target="_blank"
    >
      <Image
        alt="DEUTSCH La"
        className="inline"
        height={12}
        src="/img/dla-m.svg"
        width={99}
      />
    </a>
  </p>
)

export default Powered
