'use client'

import Script from 'next/script'

import Lockup from '../components/lockup'
import Legal from '../components/legal'

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
      <div className="grid-template-columns: repeat(12, minmax(0, 1fr)) mt-10 w-full max-w-5xl">
        <div className="lex mx-auto w-full flex-col items-center">
          <Lockup subhead={false} />
          <section className="mx-auto w-10/12">
            <h1 className="heading-1 my-8 text-center">Rescue Writer Terms and Conditions</h1>
            <p>
              Thank you for using Rescue Writer AI to create bios for shelter animals to help them
              find forever home!
            </p>{' '}
            <p>
              By using the Rescue Writer AI application programming interface, software, tools,
              data, and documentation (the “Service,”) you agree to these Terms and Conditions
              (“Terms”). As used in these Terms, “you” means the individual or entity using the
              Service (and/or any individual, entity or successor entity, agency or network acting
              on your behalf), “we” or “us” means Deutsch LA, Inc., (“DLA”), PetSmart Charities,
              Inc. and PetSmart Charities of Canada (each and together, “PetSmart Charities”) and
              their respective agents, assigns and contractors. The “parties” means you and us. The
              Terms include our Privacy Policy, and other documentation, guidelines, or policies we
              may provide in writing.
            </p>
            <p className="font-bold">
              USE OF THE SERVICE BY ANYONE UNDER 18 IS STRICTLY PROHIBITED. YOU AGREE AND ACCEPT
              THAT ANY USE OF THE SERVICE AND THE OUTPUT CREATED BY THE SERVICE IS AT YOUR OWN RISK.
            </p>
            <p className="heading-4 mt-8">1. YOU</p>
            <p>
              You represent and warrant that (i) you are at least 18 years of age and have full
              power and authority to enter into these Terms; (ii) your use of the Service will not
              violate any applicable law or the rights of any third party; (iii) entering into or
              performing under these Terms will not violate any agreement you have with a third
              party or any third-party rights; and (iv) you will not use the Services in a manner
              that violates applicable law or the rights of any third party. You further agree not
              to: (i) reverse assemble, reverse compile, decompile, translate or otherwise attempt
              to discover the source code or underlying components of models, algorithms, and
              systems of the Service; (ii) use the Service to develop foundation models or other
              large scale models that compete with the Service; (iii) use any method to extract data
              from the Service, including web scraping, web harvesting, or web data extraction
              methods, other than as expressly permitted through the Service; (iv) represent that
              Output, as defined below, from the Service was human-generated when it is not; or (v)
              buy, sell, or transfer the Service or Output.
            </p>
            <p className="heading-4 mt-8">2. YOUR CONTENT AND OUTPUT</p>
            <p>
              You represent and warrant that you have all the rights to the input, information,
              content, data and /or materials provided by you (“Content”) and that none of the
              Content used with and/or inputted into the Service: (i) infringes, misappropriates or
              violates any intellectual property rights or proprietary rights of any third parties
              or uses any elements not personally created by you; (ii) contains any viruses or
              programming routines intended to damage, surreptitiously intercept or expropriate the
              Services or any system, data or personal information; or (iii) is false, misleading or
              inaccurate. In addition, you agree not to upload any confidential information or
              personally identifiable information into the Service.
            </p>
            <p>
              You are also responsible for any output that is generated by the Service, including
              without limitation the shelter animal bio created from your Content (“Output”) at any
              stage, including generating, editing, saving, publicly posting, privately sharing or
              otherwise making the Output available. You agree not to use the Service in a way which
              may lead to inaccurate, unlawful, or harmful Output.
            </p>
            <p>
              You agree and accept that any use of the Output is at your own risk. We do not make
              any representations or warranties that the Output is accurate, reliable, or correct,
              or fit for any particular purpose. We do not provide any warranty that you will be
              able to claim copyright ownership of any Output or that the Output will not infringe
              on any third-party intellectual property rights.
            </p>
            <p>
              You acknowledge that because of the developing nature of AI technologies, the Output
              generated by the Service might be offensive, harmful, inaccurate, or otherwise
              inappropriate. You understand and agree that by using the Service, you may be exposed
              to such Output, and that you will not save, share (including on social media), use,
              distribute, display, or otherwise make available any Content or Output that is
              offensive, harmful, inaccurate, or otherwise inappropriate.
            </p>
            <p className="heading-4 mt-8">3. CONTENT LICENSE</p>
            <p>
              By using the Service, you grant DLA and PetSmart Charities the right to use, modify,
              adapt, reproduce, distribute, display your Content and Output to the extent necessary
              to provide, maintain and improve the Service, comply with applicable laws, and enforce
              our policies.
            </p>
            <p className="heading-4 mt-8">4. USING OUR SERVICE</p>
            You may use the Service only as permitted by these Terms and any applicable laws. You
            agree not to misuse our Service.
            <p className="heading-4 mt-8">5. THIRD PARTY SERVICES</p>
            Any third party software, services, or other products you use in connection with the
            Service are subject to their own terms, and we are not responsible for third party
            products or for your Content or Output.
            <p className="heading-4 mt-8">6. TERMINATION</p>
            We may terminate your access to the Service at any time for failure to comply with these
            Terms.
            <p className="heading-4 mt-8">7. CHANGES TO OUR SERVICE; CHANGES TO THESE TERMS</p>
            <p>
              We are constantly changing and improving our Service. We may add or remove
              functionalities or features of the Service at any time, and we may suspend or stop the
              Service altogether.
            </p>
            <p>
              These Terms are our entire agreement relating to your use of the Service and
              supersedes any prior or contemporaneous agreements on that subject. We may modify
              these Terms at any time. We will post any modifications to the Terms on this page.
              Changes are effective immediately. If you do not agree to any modified provisions in
              these Terms, stop using the Service immediately.
            </p>
            <p className="heading-4 mt-8">8. CONFIDENTIALITY</p>
            <p>
              You may be given access to the Confidential Information of DLA, PetSmart Charities,
              our respective affiliates, and other third parties in connection with your use of the
              Service. You may use Confidential Information only as needed to use the Service as
              permitted under these Terms. You may not disclose Confidential Information to any
              third party, and you will protect Confidential Information in the same manner that you
              protect your own confidential information of a similar nature, using at least
              reasonable care. Confidential Information means nonpublic information that DLA,
              PetSmart Charities, or our respective affiliates or third parties designate as
              confidential or should reasonably be considered confidential under the circumstances,
              including software, specifications, and other nonpublic business information.
              Confidential Information does not include information that: (i) is or becomes
              generally available to the public through no fault of yours; (ii) you already possess
              without any confidentiality obligations when you received it under these Terms; (iii)
              is rightfully disclosed to you by a third party without any confidentiality
              obligations; or (iv) you independently developed without using Confidential
              Information. You may disclose Confidential Information when required by law or the
              valid order of a court or other governmental authority if you give reasonable prior
              written notice to us and use reasonable efforts to limit the scope of disclosure,
              including assisting us with challenging the disclosure requirement, in each case where
              possible.
            </p>
            <p className="heading-4 mt-8">9. PRIVACY</p>
            <p>
              To the extent we use, store, collect or otherwise process your personal data, our
              privacy policies at{' '}
              <a
                href="https://deutschla.com/privacy and"
                target="_blank"
              >
                https://deutschla.com/privacy
              </a>{' '}
              and{' '}
              <a
                href="https://petsmartcharities.org/privacy-policy"
                target="_blank"
              >
                https://petsmartcharities.org/privacy-policy
              </a>{' '}
              explain how we treat your personal data and protect your privacy when you use our
              Service. By using our Service, you agree that we can use such data in accordance with
              our respective privacy policies.
            </p>
            <p className="heading-4 mt-8">10. SECURITY</p>
            <p>
              You must implement reasonable and appropriate measures designed to help secure your
              access to and use of the Service. If you discover any vulnerabilities or breaches
              related to your use of the Service, you must promptly contact us and provide details
              of the vulnerability or breach.
            </p>
            <p className="heading-4 mt-8">11. INDEMNITY</p>
            <p>
              You agree to indemnify, defend, and hold harmless, DLA, PetSmart Charities, and each
              of their respective parents, affiliates, officers, employees, and agents from and
              against any and all third-party claims and liabilities arising out of or related to
              (i) your Content; (ii) your use of the Service or the Output of the Service, including
              the shelter animal bio created from your Content; and (iii) your breach of these Terms
              or violation of applicable law.
            </p>
            <p className="heading-4 mt-8">12. WARRANTIES; DISCLAIMERS</p>
            <p>
              WE DO NOT MAKE ANY PROMISES, WARRANTEES OR REPRESENTATIONS ABOUT THE SERVICE OR THE
              OUTPUT. FOR EXAMPLE, WE DO NOT MAKE ANY COMMITMENTS ABOUT THE SPECIFIC FUNCTIONALITY
              OF THE SERVICE, AVAILABILITY, OR ABILITY TO MEET YOUR NEEDS OR THE ACCURACY OF THE
              OUTPUT OF THE SERVICE. WE PROVIDE THE SERVICE “AS IS” AND “AS AVAILABLE.” YOU USE THE
              SERVICE AT YOUR OWN RISK. TO THE EXTENT PERMITTED BY LAW, WE EXCLUDE ALL WARRANTIES,
              EXPRESS, STATUTORY OR IMPLIED. WE EXPRESSLY DISCLAIM THE WARRANTIES OR CONDITIONS OF
              NONINFRINGEMENT, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE AND FOR THE
              SAKE OF CLARITY, WE DO NOT WARRANT THAT THE SERVICE OR THE OUTPUT WILL BE
              UNINTERRUPTED, PRECISE OR ERROR FREE, OR THAT YOUR CONTENT OR OUTPUT WILL BE SECURE OR
              NOT LOST OR ALTERED. YOU AGREE THAT YOUR USE OF THE SERVICE AND THE OUTPUT IS AT YOUR
              OWN RISK.
            </p>
            <p className="heading-4 mt-8">13. LIMITATION OF LIABILITY</p>
            <p>
              TO THE EXTENT PERMITTED BY LAW, EXCEPT FOR ANY INDEMNIFICATION OBLIGATIONS HEREUNDER
              OR YOUR BREACH OF ANY INTELLECTUAL PROPERTY RIGHTS, CONFIDENTIALITY OBLIGATIONS AND/OR
              PROPRIETARY INTERESTS RELATING TO THESE TERMS, (i) IN NO EVENT SHALL ANY PARTY BE
              LIABLE UNDER THESE TERMS FOR ANY CONSEQUENTIAL, SPECIAL, INDIRECT, EXEMPLARY, OR
              PUNITIVE DAMAGES WHETHER IN CONTRACT, TORT OR ANY OTHER THEORY, EVEN IF SUCH PARTY HAS
              BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND NOTWITHSTANDING ANY FAILURE OF
              ESSENTIAL PURPOSE OF ANY LIMITED REMEDY, AND (ii) EACH PARTY’S AGGREGATE LIABILITY
              UNDER THESE TERMS IS LIMITED TO US$10.00. Each party acknowledges that the other party
              has entered into these Terms relying on the limitations of liability stated herein and
              that those limitations are an essential basis of the bargain between the parties.
            </p>
            <p className="heading-4 mt-8">14. MISCELLANEOUS</p>
            <p>
              <span className="font-bold">Assignment.</span> You may not assign or transfer any of
              your rights under these Terms.
            </p>
            <p>
              <span className="font-bold">Independent Contractors.</span> The parties are
              independent contractors and these Terms do not create an agency, partnership, or joint
              venture.
            </p>
            <p>
              <span className="font-bold">No Third-Party Beneficiaries.</span> Other than as
              expressly stated herein, these Terms do not create any third-party beneficiary rights.
            </p>
            <p>
              <span className="font-bold">No Waiver.</span> The failure of either party to enforce
              any provision of these Terms will not constitute a waiver.
            </p>
            <p>
              <span className="font-bold">No Class Actions.</span> Disputes must be brought on an
              individual basis only and may not be brought as a plaintiff or class member in any
              purported class, consolidated, or representative proceeding. Class arbitrations, class
              actions, private attorney general actions, and consolidation with other arbitrations
              are not allowed. If for any reason a dispute proceeds in court rather than through
              arbitration, each party knowingly and irrevocably waives any right to trial by jury in
              any action, proceeding, or counterclaim. This does not prevent either party from
              participating in a class-wide settlement of claims consistent with the Terms hereof.
            </p>
            <p>
              <span className="font-bold">Severability.</span> If it turns out that a particular
              provision of these Terms is not enforceable, the balance of these Terms will remain in
              full force and effect.
            </p>
            <p>
              <span className="font-bold">Governing Law; Venue.</span> All claims arising out of or
              relating to these Terms or the Service will be governed by Delaware law, excluding
              Delaware’s conflict of laws rules, and will be settled by arbitration or litigated
              exclusively in the federal or state courts of Delaware, and the parties consent to
              personal jurisdiction in those courts.
            </p>
            <p>
              <span className="font-bold">Force Majeure.</span> Neither party will be liable for
              inadequate performance to the extent caused by a condition (for example, natural
              disaster, act of war or terrorism, riot, labor condition, governmental action, and
              Internet disturbance) that was beyond the party’s reasonable control.
            </p>
          </section>
          <Legal />
        </div>
      </div>
    </main>
  )
}
