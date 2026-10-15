This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## AWS Amplify Deployment

This project is configured for AWS Amplify deployment. The following files are required:

- `amplify.yml` - Build specification for Amplify
- Environment variables configured in Amplify Console

### Required Environment Variables

Configure these environment variables in your AWS Amplify Console:

```
# OpenAI Configuration
OPENAI_API_KEY=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

# Google Cloud Recaptcha Configuration
GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key_here
RECAPTCHA_PROJECT_ID=your_recaptcha_project_id_here
RECAPTCHA_SCORE_LIMIT=0.9

# Public Recaptcha Configuration (these will be exposed to the client)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
NEXT_PUBLIC_RECAPTCHA_ACTION_NAME=your_recaptcha_action_name_here
```

### API Route Issues

If your API route (`/api/stories`) is not working after deployment:

1. Ensure all environment variables are properly configured in Amplify Console
2. Check that the `amplify.yml` file is present in your repository
3. Verify that your Next.js configuration includes the necessary settings for Amplify

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
