import Image from 'next/image'
import { useState } from 'react'

type ExampleProps = {
  copy: string
  img: string
  order: number
}

const examples: ExampleProps[] = [
  {
    copy: 'Sesame, a feline warrior with a heart of gold, roamed the alleyways at night to protect the innocent. One day her secret lair was discovered, so she journeyed to the shelter to seek refuge. Sesame has been training daily, purring tales of<span class="ellipsis">...</span> <span class="more">valor, awaiting a family to join her next quest. Now, she’s ready, her eyes shining with promise, her whiskers twitching for adventure, and her heart open for love. Adopt her, and let the saga continue!</span>',
    img: 'example-0.webp?id=1',
    order: 2
  },
  {
    copy: 'Hi, I’m Winston, a cuddly rabbit that was once the proud assistant of a forgetful magician named Merlin. One day, Merlin put me in his hat and forgot. I found myself in a land of mismatched socks, lost keys, and odd handkerchiefs. With some effort (and nibbling on some old capes)<span class="ellipsis">...</span> <span class="more">, I finally made my way out and hopped over to the shelter, hoping for a quieter life away from magical blunders. Now, I’m looking for a home where the only tricks are those involving carrot treats.</span>',
    img: 'example-1.webp?id=1',
    order: 3
  },
  {
    copy: 'Meet Maple, the embodiment of sweetness and loyalty in a furry companion. This endearing old soul is on a quest to find her forever home, and she promises to fill it with boundless love and unwavering devotion. By adopting Maple<span class="ellipsis">...</span><span class="more">, you’re not only gaining a faithful friend, but also giving this senior dog a chance to enjoy her twilight years in comfort and happiness. Make a difference in Maple’s life and let her warm your heart with her enduring affection. Embrace the joy of adopting Maple, and you’ll discover the true meaning of unconditional love.</span>',
    img: 'example-2.webp?id=1',
    order: 1
  }
].sort((a: ExampleProps, b: ExampleProps) => {
  return a.order - b.order
})

const Example = ({ copy, img, order }: ExampleProps) => {
  const [readMore, setReadMore] = useState(false)
  return (
    <div className={`example relative ${readMore ? 'read-more' : ''}`}>
      <Image
        alt="Pet photo"
        className="h-[auto] w-[40%] lg:w-[124px]"
        src={`/img/${img}`}
        height={124}
        width={124}
      />
      <div className="mt-4 w-[80%] text-[1.375rem] leading-8 lg:mt-0">
        <p dangerouslySetInnerHTML={{ __html: copy }} />
      </div>
      <button
        className={`absolute bottom-2 right-8 ml-auto flex cursor-pointer text-4xl font-medium leading-none   text-psc-red ${
          !readMore ? '' : 'hidden'
        }`}
        onClick={() => {
          setReadMore(true)
        }}
      >
        +
      </button>
    </div>
  )
}

const Examples = () => {
  return examples.map((example: ExampleProps, i: number) => (
    <Example
      key={`example-${example.order}`}
      copy={example.copy}
      img={example.img}
      order={example.order}
    />
  ))
}

export default Examples
