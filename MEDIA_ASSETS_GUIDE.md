# Media Assets Guide for Vercel

## 📁 Option 1: Public Folder (Recommended for Static Assets)

**Best for:** Static images and videos that don't change often

### Setup:
1. Create a `public` folder in your project root ✅ (Already created)
2. Subfolders created:
   - `public/logos/` - For brand logos
   - `public/images/` - For general images
   - `public/videos/` - For video files

### Usage:
```typescript
// In your components
<img src="/logos/brand1.png" alt="Brand 1" />
<img src="/images/hero-bg.jpg" alt="Hero" />
<video src="/videos/demo.mp4" controls />
```

**Pros:**
- ✅ Simple and straightforward
- ✅ No additional services needed
- ✅ Works out of the box with Next.js
- ✅ Files are served from CDN automatically on Vercel

**Cons:**
- ❌ Files are committed to git (can bloat repository)
- ❌ No image optimization/transformation
- ❌ Not ideal for user-uploaded content

---

## ☁️ Option 2: Vercel Blob Storage (Recommended for Dynamic Content)

**Best for:** User-uploaded images, dynamic content, large files

### Setup:
1. Install Vercel Blob:
```bash
npm install @vercel/blob
```

2. Create a Vercel Blob store in your Vercel dashboard

3. Upload files programmatically:
```typescript
import { put } from '@vercel/blob';

const blob = await put('logo.png', file, {
  access: 'public',
});
// Returns: { url: 'https://...' }
```

**Pros:**
- ✅ Perfect for dynamic/user-uploaded content
- ✅ Automatic CDN delivery
- ✅ Doesn't bloat git repository
- ✅ Built-in optimization

**Cons:**
- ❌ Requires API calls to upload
- ❌ Small cost per GB stored

---

## 🎨 Option 3: Cloudinary (Recommended for Image/Video Transformations)

**Best for:** Need automatic image resizing, optimization, or video transformations

### Setup:
1. Sign up at cloudinary.com (free tier available)
2. Install Cloudinary SDK:
```bash
npm install cloudinary
```

3. Configure in `.env.local`:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Pros:**
- ✅ Automatic image optimization
- ✅ On-the-fly image transformations
- ✅ Video processing and optimization
- ✅ Free tier available

**Cons:**
- ❌ Additional service to manage
- ❌ Requires API integration

---

## 🛒 Option 4: Shopify CDN (If Using Shopify)

**Best for:** Already using Shopify, want to leverage existing assets

Your `next.config.js` already has Shopify CDN configured!

### Usage:
```typescript
// Images from Shopify
<img src="https://cdn.shopify.com/s/files/1/1234/5678/files/logo.png" />
```

**Pros:**
- ✅ Already configured
- ✅ No additional setup
- ✅ Integrated with Shopify

**Cons:**
- ❌ Requires Shopify account
- ❌ Limited to Shopify-hosted assets

---

## 📝 Recommended Setup for Your Project

Based on your current setup, I recommend:

1. **Static Assets (Logos, Static Images):**
   - Use `public/` folder ✅ (Already created)
   - Example: `public/logos/brand1.png`

2. **User-Uploaded Content:**
   - Use Vercel Blob or Cloudinary
   - Better for dynamic content

3. **Large Videos:**
   - Use Vercel Blob or Cloudinary
   - Or external hosting (YouTube, Vimeo) for videos

---

## 📂 Folder Structure Created

```
public/
├── logos/          # Brand logos
├── images/         # General images
└── videos/         # Video files
```

---

## 🔧 Update Your Code

Update `app/media-kit/page.tsx` to use local paths:

```typescript
const sampleLogos = [
  { id: '1', brandName: 'Brand 1', logoUrl: '/logos/brand1.png' },
  { id: '2', brandName: 'Brand 2', logoUrl: '/logos/brand2.png' },
  // ... etc
]
```

---

## 🚀 Deploying to Vercel

When you deploy to Vercel:
- Files in `public/` are automatically served
- No additional configuration needed
- Files are cached on Vercel's CDN globally

---

## 💡 Pro Tips

1. **Image Optimization:** Use Next.js `Image` component for automatic optimization
2. **Video Hosting:** For better performance, consider YouTube/Vimeo embeds for videos
3. **File Sizes:** Keep images under 1MB, videos under 10MB for best performance
4. **Git:** Add `public/logos/`, `public/images/` to `.gitignore` if files are large

















