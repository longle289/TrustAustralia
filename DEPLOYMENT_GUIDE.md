# Trust Australia - Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Neon account (sign up at https://neon.tech)
- Stripe account with API keys
- Resend account for emails

## Step 1: Push to GitHub

1. Create a new repository on GitHub: https://github.com/new
   - Name it: `trust-australia`
   - Keep it private (recommended for business apps)
   - Don't initialize with README (we already have code)

2. Add the remote and push:
   ```bash
   cd trust-australia
   git remote add origin https://github.com/YOUR_USERNAME/trust-australia.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Set Up Neon Database

1. Go to https://console.neon.tech
2. Create a new project:
   - Name: `trust-australia`
   - Region: Choose closest to your users
3. Copy the connection string (it looks like):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
4. Keep this handy - you'll need it for Vercel

## Step 3: Set Up Stripe

1. Go to https://dashboard.stripe.com/apikeys
2. Get your keys:
   - **Secret Key** (starts with `sk_live_` for production)
   - **Publishable Key** (starts with `pk_live_` for production)
3. Set up webhook:
   - Go to https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - Endpoint URL: `https://YOUR_DOMAIN/api/webhook` (you'll update this after deployment)
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the webhook signing secret (starts with `whsec_`)

## Step 4: Set Up Resend

1. Go to https://resend.com/api-keys
2. Create an API key
3. Add and verify your domain (or use the test domain for now)
4. Copy the API key (starts with `re_`)

## Step 5: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository (`trust-australia`)
3. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)

4. Add Environment Variables (click "Environment Variables"):

   ```env
   # Database
   DATABASE_URL=your_neon_connection_string_from_step_2

   # Stripe
   STRIPE_SECRET_KEY=sk_live_xxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx

   # NextAuth
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=generate_a_random_32_char_string

   # Resend
   RESEND_API_KEY=re_xxx

   # Base URL
   NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
   ```

5. Click "Deploy"

## Step 6: Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```
Or use: https://generate-secret.vercel.app/32

## Step 7: Run Database Migrations

After deployment, run migrations:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Link your project:
   ```bash
   cd trust-australia
   vercel link
   ```

3. Run migrations:
   ```bash
   vercel env pull .env.production
   npx prisma migrate deploy
   ```

## Step 8: Update Stripe Webhook URL

1. Go back to Stripe webhook settings
2. Update the endpoint URL to: `https://your-actual-domain.vercel.app/api/webhook`
3. Save the changes

## Step 9: Test Your Deployment

1. Visit your Vercel URL
2. Test the following:
   - [ ] Homepage loads
   - [ ] User can sign up/login
   - [ ] Trust creation forms work
   - [ ] Checkout flow completes
   - [ ] Email notifications arrive
   - [ ] PDF generation works
   - [ ] Order appears in account dashboard

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL in Vercel environment variables
- Check Neon connection string is correct and includes `?sslmode=require`
- Ensure migrations have been run

### Stripe Webhook Failures
- Check webhook URL matches your deployment URL
- Verify STRIPE_WEBHOOK_SECRET is correct
- Check webhook events are configured correctly

### Email Not Sending
- Verify RESEND_API_KEY is correct
- Check domain verification in Resend dashboard
- Look at Resend logs for errors

### Environment Variables Not Loading
- Redeploy after adding new environment variables
- Verify variables are set for Production environment
- Check for typos in variable names

## Post-Deployment

### Custom Domain (Optional)
1. Go to your Vercel project settings
2. Add your custom domain
3. Update DNS records as instructed
4. Update NEXTAUTH_URL and NEXT_PUBLIC_BASE_URL to your custom domain
5. Update Stripe webhook URL

### Monitoring
- Set up Vercel Analytics
- Monitor Stripe dashboard for payments
- Check Neon dashboard for database usage
- Review application logs in Vercel

## Production Checklist

- [ ] All environment variables configured
- [ ] Database migrations run successfully
- [ ] Stripe webhook configured and tested
- [ ] Email sending tested
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] User registration tested
- [ ] Payment flow tested end-to-end
- [ ] PDF generation tested
- [ ] Order history displays correctly

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Stripe Docs: https://stripe.com/docs
- Next.js Docs: https://nextjs.org/docs
