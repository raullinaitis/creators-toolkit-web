# Vercel Deployment Guide

## Quick Deploy Checklist

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Environment variables added
- [ ] First deployment successful
- [ ] Custom domain configured (optional)

---

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your repositories

### Step 3: Import Project

1. In Vercel dashboard, click **Add New Project**
2. Find your repository in the list
3. Click **Import**

### Step 4: Configure Project

Vercel will auto-detect Next.js settings. You can usually use defaults:

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### Step 5: Add Environment Variables

**Before deploying**, add your Shopify credentials:

1. In the project setup page, scroll to **Environment Variables**
2. Click **Add** and add these variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_STORE_DOMAIN`
   - Value: `your-store.myshopify.com`
   - Environment: Select all (Production, Preview, Development)

   **Variable 2:**
   - Name: `NEXT_PUBLIC_STOREFRONT_API_TOKEN`
   - Value: `your-storefront-api-token`
   - Environment: Select all (Production, Preview, Development)

3. Click **Save**

### Step 6: Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for build to complete
3. Your site will be live at `your-project.vercel.app`

### Step 7: Verify Deployment

1. Visit your Vercel URL
2. Check that Shopify products load
3. Test navigation and pages

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

From your project directory:

```bash
vercel
```

**First time prompts:**
- Set up and deploy? **Yes**
- Which scope? (select your account)
- Link to existing project? **No**
- Project name? (press enter for default)
- Directory? (press enter for `./`)
- Override settings? **No**

### Step 4: Add Environment Variables

```bash
# Add store domain
vercel env add NEXT_PUBLIC_STORE_DOMAIN

# When prompted:
# - Value: your-store.myshopify.com
# - Environment: Select all (Production, Preview, Development)

# Add API token
vercel env add NEXT_PUBLIC_STOREFRONT_API_TOKEN

# When prompted:
# - Value: your-token-here
# - Environment: Select all (Production, Preview, Development)
```

### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## Environment Variables Reference

### Required Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_STORE_DOMAIN` | Your Shopify store domain | `mystore.myshopify.com` |
| `NEXT_PUBLIC_STOREFRONT_API_TOKEN` | Public Storefront API token | `shpat_abc123...` |

### Optional Variables:

| Variable | Description | When to Use |
|----------|-------------|-------------|
| `PRIVATE_STOREFRONT_API_TOKEN` | Private Storefront API token | Server-side operations only |

### Important Notes:

- **Never commit** `.env.local` to Git (already in `.gitignore`)
- **Always use** `NEXT_PUBLIC_` prefix for client-side variables
- **Set for all environments** (Production, Preview, Development) unless you have different values

---

## Updating Environment Variables

### Via Dashboard:

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Edit or add variables
4. Click **Save**
5. Redeploy (or wait for next deployment)

### Via CLI:

```bash
# List current variables
vercel env ls

# Add new variable
vercel env add VARIABLE_NAME

# Remove variable
vercel env rm VARIABLE_NAME
```

---

## Custom Domain Setup

### Step 1: Add Domain in Vercel

1. Go to project **Settings** → **Domains**
2. Enter your domain (e.g., `store.yourdomain.com`)
3. Click **Add**

### Step 2: Configure DNS

Vercel will show you DNS records to add:

**For root domain (`yourdomain.com`):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

**For subdomain (`store.yourdomain.com`):**
- Type: `CNAME`
- Name: `store`
- Value: `cname.vercel-dns.com`

### Step 3: Wait for DNS Propagation

- Usually takes 5-60 minutes
- Check status in Vercel dashboard
- Once verified, SSL certificate is automatically issued

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check `package.json` has all dependencies
- Run `npm install` locally to verify
- Check Vercel build logs for specific missing package

**Error: "Environment variable not found"**
- Verify variables are set in Vercel dashboard
- Check variable names match exactly (case-sensitive)
- Ensure variables are set for correct environment

**Error: "Shopify API error"**
- Verify environment variables are correct
- Check Shopify store is active
- Verify API token has correct permissions

### Deployment Succeeds But Site Doesn't Work

**Products not loading:**
- Check browser console for errors
- Verify environment variables are set correctly
- Check Shopify products are published and available to Headless channel

**404 errors:**
- Check Next.js routing configuration
- Verify pages exist in `app/` directory
- Check Vercel build logs for routing issues

### Performance Issues

**Slow page loads:**
- Enable Vercel Analytics
- Check image optimization settings
- Verify Shopify API response times

**Build timeouts:**
- Check build logs for slow operations
- Optimize dependencies
- Consider upgrading Vercel plan if needed

---

## Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to:
- **Production**: `main` or `master` branch
- **Preview**: Any other branch or pull request

### Manual Deployments

```bash
# Deploy current code
vercel --prod

# Deploy specific branch
vercel --prod --branch=feature-branch
```

---

## Monitoring & Analytics

### Vercel Analytics

1. Go to project **Analytics** tab
2. Enable Analytics (may require upgrade)
3. View page views, performance metrics

### Build Logs

1. Go to **Deployments** tab
2. Click on any deployment
3. View build logs and runtime logs

---

## Rollback Deployment

If something goes wrong:

1. Go to **Deployments** tab
2. Find previous working deployment
3. Click **⋯** menu → **Promote to Production**

---

## Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Open project in browser
vercel open
```

---

## Next Steps After Deployment

1. ✅ Test all pages and features
2. ✅ Set up custom domain
3. ✅ Configure analytics
4. ✅ Set up monitoring/alerts
5. ✅ Document your deployment process

---

**Your site is now live!** 🎉

For more help, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)












