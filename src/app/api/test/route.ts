import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'API is working',
    timestamp: new Date().toISOString(),
    env: {
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      hasGoogleCloudKey: !!process.env.GOOGLE_CLOUD_API_KEY,
      hasRecaptchaProjectId: !!process.env.RECAPTCHA_PROJECT_ID,
      hasRecaptchaSiteKey: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      hasRecaptchaAction: !!process.env.NEXT_PUBLIC_RECAPTCHA_ACTION_NAME,
      recaptchaScoreLimit: process.env.RECAPTCHA_SCORE_LIMIT
    }
  })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    return NextResponse.json({
      message: 'POST is working',
      receivedData: data,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to parse JSON',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 })
  }
} 