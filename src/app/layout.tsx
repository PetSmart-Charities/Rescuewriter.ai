import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rescue Writer™ by PetSmart Charities',
  description:
    "The world's first AI tool to help every shelter, volunteer and foster write a shelter pet's profile instantly. "
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          property="og:title"
          content="PetSmart Charities has created Rescue Writer™, the world's first AI tool to help write a shelter pet's profile instantly."
        />
        <meta
          property="og:description"
          content=""
        />
        <meta
          property="og:url"
          content="https://www.rescuewriter.ai"
        />
        <meta
          property="og:image"
          content="https://www.rescuewriter.ai/img/share.jpg"
        />
        <meta
          property="og:type"
          content="website"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
