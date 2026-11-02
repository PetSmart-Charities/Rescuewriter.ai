import axios from 'axios'

export function verifyRecaptcha(token: string) {
  const apiKey = process.env.GOOGLE_CLOUD_API_KEY
  const projectId = process.env.RECAPTCHA_PROJECT_ID
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const recaptchaAction = process.env.NEXT_PUBLIC_RECAPTCHA_ACTION_NAME
  const baseUrl = 'https://recaptchaenterprise.googleapis.com'
  const path = `/v1/projects/${projectId}/assessments`
  const url = `${baseUrl}${path}?key=${apiKey}`

  const body = JSON.stringify({
    event: {
      expectedAction: recaptchaAction,
      siteKey: recaptchaSiteKey,
      token: token
    }
  })

  return axios
    .post(url, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const data = response.data

      if (response.status === 200 && data.tokenProperties) {
        return data?.riskAnalysis?.score
      } else {
        throw new Error('reCAPTCHA verification failed.')
      }
    })
    .catch(error => {
      throw new Error('reCAPTCHA verification failed: ' + error.message)
    })
}
