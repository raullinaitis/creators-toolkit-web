# Headless Shopify Store - Clean Slate

A clean, minimal headless Shopify storefront built with Next.js. This is your starting point - build your design from here!

## What is This?

This is a minimal setup that connects your Next.js frontend to Shopify's backend. Think of it like a blank canvas - you have the tools (Shopify API) ready to use, and now you can paint your own design.

## What's Included

✅ **Shopify API Integration** - Ready to fetch products, collections, and shop data
✅ **Minimal Example Page** - Demonstrates how to use the API
✅ **Clean Base Styles** - Simple, minimal CSS to start with
✅ **Core Configuration** - Next.js, TypeScript, and Shopify setup complete

## Getting Started

### Step 1: Set Up Shopify Backend

1. **Create or Log into Your Shopify Store**
   - Go to [shopify.com](https://www.shopify.com) and create an account if you don't have one

2. **Install the Headless Channel**
   - In your Shopify admin, go to **Settings** > **Apps and sales channels**
   - Click **Browse apps** and search for "Headless"
   - Install the **Headless** channel (it's free)
   - Click **Create storefront** to generate your API credentials

3. **Get Your API Credentials**
   - Copy your **Store domain** (e.g., `your-store.myshopify.com`)
   - Copy your **Storefront API access token** (long string of characters)

4. **Make Products Available**
   - In Shopify admin, go to **Products**
   - For each product, click **Manage** next to "Sales channels"
   - Make sure your Headless storefront is checked

### Step 2: Configure This Project

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   - Copy the example file:
     ```bash
     cp env.local.example .env.local
     ```
   - Open `.env.local` and add your credentials:
     ```
     NEXT_PUBLIC_STORE_DOMAIN=your-store.myshopify.com
     NEXT_PUBLIC_STOREFRONT_API_TOKEN=your-token-here
     ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Your Browser**
   - Go to [http://localhost:3000](http://localhost:3000)
   - You should see your products displayed!

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout (minimal)
│   ├── page.tsx        # Homepage example (shows API usage)
│   └── globals.css     # Base styles (minimal)
├── lib/
│   ├── shopify.ts      # Shopify API client ⭐ KEEP THIS
│   └── queries.ts      # GraphQL queries ⭐ KEEP THIS
├── components/         # Empty - add your components here!
├── hooks/             # Empty - add your hooks here!
└── package.json        # Dependencies
```

## Using the Shopify API

Your API is ready to use! Here's how:

```typescript
import { GET_PRODUCTS } from '@/lib/queries';
import { storefrontQuery } from '@/lib/shopify';

// Fetch products
const data = await storefrontQuery(GET_PRODUCTS, { first: 10 });
const products = data.products.edges.map(edge => edge.node);
```

See `app/page.tsx` for a complete example.

## Available API Queries

- `GET_PRODUCTS` - Get all products
- `GET_PRODUCT_BY_HANDLE` - Get a single product
- `GET_COLLECTIONS` - Get product collections
- `GET_SHOP_INFO` - Get shop name and description

All queries are in `lib/queries.ts`. Add more as needed!

## Next Steps

- Build your own components
- Create your design system
- Add pages for products, collections, cart, checkout
- Customize the styling to match your brand
- Add features like search, filters, customer accounts

## Resources

- **Shopify Storefront API**: [shopify.dev/docs/api/storefront](https://shopify.dev/docs/api/storefront)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **GraphQL Reference**: [shopify.dev/docs/api/storefront/graphql](https://shopify.dev/docs/api/storefront/graphql)

## Important Notes

- The `NEXT_PUBLIC_STOREFRONT_API_TOKEN` is safe to use in frontend code (it's public)
- Never commit your `.env.local` file to git
- Make sure products are published and available to your Headless storefront in Shopify admin

Happy building! 🚀
