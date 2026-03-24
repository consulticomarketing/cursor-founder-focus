# Founder Focus Events

Next.js landing site for Founder Focus events (waitlist, about, schedule, FAQ, etc.).

## Local development

**Prerequisites:** Node.js 18+ and npm.

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the dev server**
   ```bash
   npm run dev
   ```

3. **Open in the browser**  
   [http://localhost:3000](http://localhost:3000) - the page hot-reloads as you edit.

**Key files to edit:**
- `app/page.tsx` - home page layout (sections order)
- `components/*.tsx` - hero, stats, about, schedule, CTA, location, testimonials, FAQ, waitlist, footer
- `app/api/waitlist/route.ts` - waitlist signup (currently logs to console; swap for Resend/Mailchimp/Tally later)

No `.env` required for local run. Waitlist API is a placeholder and works without config.

## Deploy to Vercel (share the live site)

**Option A - One-time deploy (CLI)**  
1. Install Vercel CLI and log in (one time): `npm i -g vercel` then `vercel login`  
2. From the project root: `vercel --prod` (or `npm run deploy` after `npm i -g vercel`)  
3. You’ll get a URL like `https://founder-focus-events-xxx.vercel.app` to share.

**Option B - GitHub + Vercel (recommended)**  
1. Push this repo to GitHub.  
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → Import your repo.  
3. Leave defaults (framework: Next.js, build: `next build`, output: default).  
4. Click **Deploy**. Every push to `main` will auto-deploy.

The project already has `vercel.json` with `"framework": "nextjs"` so Vercel will detect it.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
