This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## External Tools & Services

This project uses several external tools and services:

- **Next.js**: A modern React framework for fullstack web development. [Documentation](https://nextjs.org/docs)
- **Convex**: Backend as a Service (BaaS) for database, serverless functions, and real-time sync. [Documentation](https://docs.convex.dev)
- **UploadThing**: File upload service for handling image and file uploads. [Documentation](https://docs.uploadthing.com)
- **Mux**: Video management and streaming platform (upload, streaming). [Documentation](https://docs.mux.com)
- **Stripe**: Online payment platform for managing subscriptions and payments. [Documentation](https://stripe.com/docs)
- **OAuth Authentication (GitHub, Google)**: Secure login via GitHub and Google. [NextAuth.js](https://authjs.dev/)
- **Tailwind CSS**: Utility-first CSS framework for fast and responsive design. [Documentation](https://tailwindcss.com)
- **Radix UI**: Accessible, unstyled UI components for React. [Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- **React Icons**: Icon library for React. [Documentation](https://react-icons.github.io/react-icons/)
- **Fabric.js**: Canvas library for manipulating graphic objects (used for the design editor). [Documentation](http://fabricjs.com/)

API keys and tokens required for these services should be placed in the `.env.local` file.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Second terminal : 
refere to Convex setup tutorial :  https://docs.convex.dev/quickstarts
 (Once finish)
```bash
npx convex dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
