import Link from 'next/link'

const Legal = () => (
  <div className="my-20 w-10/12 text-center text-[0.8125rem] leading-none">
    <p>
      Rescue Writer<sup>&trade;</sup> will create a profile, but it’s your responsibility to ensure
      it’s accurate before any use.
    </p>
    <ul className="mt-4 flex justify-center gap-2 ">
      <li>
        <Link href="/terms">Terms</Link>
      </li>
      <li>|</li>
      <li>&copy;2023 PetSmart Charities, Inc. All rights reserved.</li>
    </ul>
  </div>
)

export default Legal
