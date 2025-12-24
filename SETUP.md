# Canada Mexico Visa Info - Production Setup Guide

## ✅ Pre-Deployment Checklist

### 1. Update Domain References
Replace `canadamexicovisa.info` with your actual domain in these files:
- [ ] `index.html` - canonical URL, Open Graph URLs, structured data
- [ ] `privacy.html` - if any URLs mentioned
- [ ] `terms.html` - if any URLs mentioned  
- [ ] `sitemap.xml` - all page URLs
- [ ] `robots.txt` - sitemap URL

### 2. Google Analytics Setup
1. Create a Google Analytics 4 property at https://analytics.google.com
2. Get your Measurement ID (looks like: G-XXXXXXXXXX)
3. Replace `G-XXXXXXXXXX` in `index.html` with your actual ID

### 3. Google AdSense Setup
✅ **Publisher ID already configured:** `pub-3212022468120924`

After AdSense approval, create ad units:
1. Go to https://www.google.com/adsense
2. Create 6 display ad units (responsive)
3. Replace each `data-ad-slot="9057164066"` in `index.html` with actual slot IDs

### 4. Create Missing Image Assets
Generate these images for full PWA/social support:
- [ ] `og-image.jpg` - 1200x630px social sharing image
- [ ] `apple-touch-icon.png` - 180x180px
- [ ] `favicon-32x32.png` - 32x32px
- [ ] `favicon-16x16.png` - 16x16px
- [ ] `icon-192.png` - 192x192px (PWA)
- [ ] `icon-512.png` - 512x512px (PWA)

**Quick tool:** Use https://realfavicongenerator.net with your favicon.svg

---

## 🚀 Deployment Options

### Option A: Netlify (Recommended - Free)
1. Push code to GitHub
2. Connect repo to Netlify
3. Deploy automatically
4. Add custom domain in Netlify settings

### Option B: Vercel (Free)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically
4. Add custom domain

### Option C: Traditional Hosting (cPanel)
1. Upload all files via FTP to `public_html`
2. Ensure `.htaccess` is uploaded (may be hidden)
3. Point domain to hosting

### Option D: GitHub Pages (Free)
1. Push to GitHub
2. Enable Pages in repo settings
3. Select branch to deploy

---

## 📁 File Structure

```
/
├── index.html          # Main landing page
├── privacy.html        # Privacy policy (required for AdSense)
├── terms.html          # Terms of use (required for AdSense)
├── 404.html           # Custom error page
├── styles.css         # Main stylesheet
├── styles.min.css     # Minified CSS (use in production)
├── script.js          # JavaScript
├── script.min.js      # Minified JS (use in production)
├── favicon.svg        # Vector favicon
├── manifest.json      # PWA manifest
├── robots.txt         # Search engine directives
├── sitemap.xml        # XML sitemap for SEO
├── ads.txt            # AdSense verification
├── .htaccess          # Apache server config
├── netlify.toml       # Netlify config
├── vercel.json        # Vercel config
└── SETUP.md           # This file
```

---

## 🔧 Production Optimizations

### For Best Performance:
1. **Use minified files:** Change `styles.css` → `styles.min.css` and `script.js` → `script.min.js` in index.html
2. **Enable HTTPS:** Required for AdSense
3. **Submit sitemap:** Add to Google Search Console

### Google Search Console Setup:
1. Go to https://search.google.com/search-console
2. Add your property (domain)
3. Verify ownership
4. Submit sitemap: `https://canadamexicovisa.info/sitemap.xml`

---

## 📊 Post-Launch Tasks

- [ ] Verify ads.txt is accessible: `canadamexicovisa.info/ads.txt`
- [ ] Test on mobile devices
- [ ] Submit to Google Search Console
- [ ] Monitor AdSense for approval status
- [ ] Check PageSpeed Insights: https://pagespeed.web.dev
- [ ] Test all links work correctly

---

## 🆘 Troubleshooting

**Ads not showing?**
- Wait 24-48 hours after AdSense approval
- Ensure ad slot IDs are correctly placed
- Check browser console for errors

**404 page not working?**
- Verify 404.html is in root directory
- Check .htaccess is uploaded (Apache)
- Check netlify.toml/vercel.json for other hosts

**Styles not loading?**
- Check file paths are correct
- Clear browser cache
- Verify CSS file uploaded successfully

---

## 📞 Support Resources

- AdSense Help: https://support.google.com/adsense
- Search Console Help: https://support.google.com/webmasters
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs

