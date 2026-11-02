'use client'

import Script from 'next/script'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import Legal from '../components/legal'
import Lockup from '../components/lockup'

import Form from '../components/form'

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
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        useEnterprise
      >
        <Lockup
          animate={false}
          subhead={false}
        />
        <div className="grid-template-columns: repeat(12, minmax(0, 1fr)) w-full max-w-5xl">
          <div className="mx-auto my-10 flex w-full flex-col items-center">
            <Form />
            <Legal />
          </div>
        </div>
      </GoogleReCaptchaProvider>
    </main>
  )
}
