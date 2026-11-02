'use client'

import Script from 'next/script'

import Lockup from './components/lockup'
import Intro from './components/intro'
import Legal from './components/legal'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
      >
        {`
          (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-N7LJPPD');
          `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=GTM-N7LJPPD`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Lockup animate={false} />
      <div className="grid-template-columns: repeat(12, minmax(0, 1fr)) w-full max-w-5xl">
        <div className="mx-auto mb-10 mt-7 flex w-full flex-col items-center">
          <Intro />
          <Legal />
        </div>
      </div>
    </main>
  )
}
