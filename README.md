# Personal Website

A modern, minimalist personal website built with Next.js 14, featuring a blog with MDX support, drafts, scheduled publishing, full-text search, and comments. Exports as **fully static HTML** for easy deployment anywhere.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Content**: MDX via Velite
- **Search**: MiniSearch (client-side full-text search)
- **Comments**: Giscus (GitHub Discussions)
- **Theme**: next-themes (light/dark mode)
- **Output**: Static HTML (deployable to any static host)

## Features

- ✅ MDX blog posts with code highlighting (Shiki)
- ✅ Draft posts and scheduled publishing
- ✅ Tags, categories, and series support
- ✅ Full-text search with keyboard shortcut (⌘K)
- ✅ Comments via Giscus (toggleable per post)
- ✅ SEO optimized with sitemap and RSS feed
- ✅ OG image generation
- ✅ Light/dark mode with system preference
- ✅ **Static export** - deploy to any static host (Netlify, Vercel, GitHub Pages, S3, etc.)
- ✅ Self-hostable with Docker + nginx

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

```env
# Site URL for SEO and RSS
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Giscus comments (optional)
NEXT_PUBLIC_GISCUS_REPO=yourusername/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=YOUR_REPO_ID
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=YOUR_CATEGORY_ID
```

## Content Management

### Creating Blog Posts

Create MDX files in `src/content/posts/`:

```mdx
---
title: My Post Title
description: A brief description of the post
publishDate: "2024-01-15"
tags:
  - Tag1
  - Tag2
category: Category Name
series: Optional Series Name
seriesOrder: 1
comments: true
draft: false
---

# Your content here

Write your post content in MDX format.
```

### Frontmatter Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `description` | string | Yes | Brief description |
| `publishDate` | string (ISO) | Yes | Publication date |
| `updatedDate` | string (ISO) | No | Last update date |
| `draft` | boolean | No | Hide from production |
| `tags` | string[] | No | Post tags |
| `category` | string | No | Post category |
| `series` | string | No | Series name |
| `seriesOrder` | number | No | Order in series |
| `comments` | boolean | No | Enable comments (default: true) |

### Publishing Rules

- Posts with `draft: true` are hidden from production
- Posts with `publishDate` in the future are hidden until that date
- Both sitemap and RSS feed exclude unpublished posts

## Configuration

### Giscus Comments

1. Visit [giscus.app](https://giscus.app)
2. Configure with your GitHub repository
3. Update `src/components/giscus.tsx` with your settings:

```typescript
const GISCUS_CONFIG = {
  repo: "yourusername/your-repo",
  repoId: "YOUR_REPO_ID",
  category: "Announcements",
  categoryId: "YOUR_CATEGORY_ID",
  // ...
};
```

### Site Metadata

Update `src/app/layout.tsx` with your information:

- Site title and description
- Social links
- Author information

## Development

```bash
# Development server
npm run dev

# Build for production (static export to ./out)
npm run build

# Generate RSS feed
npm run build:rss

# Generate search index
npm run build:search
```

## Deployment

### Static Hosting (Recommended)

After running `npm run build`, the `out/` folder contains the complete static site. Deploy to:

- **Netlify**: Drag & drop the `out/` folder or connect your repo
- **Vercel**: Works out of the box with Next.js static export
- **GitHub Pages**: Copy `out/` contents to your `gh-pages` branch
- **AWS S3 / CloudFlare Pages / any static host**: Upload `out/` folder

### Docker (with nginx)

```bash
# Build image
docker build -t personal-website .

# Run container
docker run -p 80:80 personal-website
```

Or with Docker Compose:

```bash
docker compose up -d
```

### With Nginx (Manual Setup)

If deploying the static files directly to a server:

1. Copy the `out/` folder contents to your web root
2. Configure nginx to serve static files with proper caching

Example nginx config:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/personal-website;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### SSL with Certbot

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Log Rotation

Configure logrotate for Nginx logs:

```
/var/log/nginx/personal-website.*.log {
    daily
    missingok
    rotate 14
    compress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```

## Launch Checklist

### Before Launch

- [ ] Update site metadata in `layout.tsx`
- [ ] Configure Giscus with your GitHub repository
- [ ] Update social links in footer
- [ ] Replace placeholder content (YourName, yourdomain.com)
- [ ] Add favicon and OG image assets
- [ ] Set `NEXT_PUBLIC_SITE_URL` environment variable

### Performance

- [ ] Run Lighthouse audit (target: 90+ all categories)
- [ ] Verify images are optimized
- [ ] Check Core Web Vitals
- [ ] Test on mobile devices

### SEO

- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Verify RSS feed at `/rss.xml`
- [ ] Test OG images with social debuggers
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt

### Security

- [ ] Enable HTTPS with valid certificate
- [ ] Verify security headers in Nginx
- [ ] Enable HSTS after testing
- [ ] Review CSP headers if needed

### Monitoring

- [ ] Set up uptime monitoring
- [ ] Configure error tracking (optional)
- [ ] Set up database backup automation
- [ ] Configure log rotation

### Final Steps

- [ ] Test all pages and features
- [ ] Verify draft posts are hidden
- [ ] Test scheduled publishing
- [ ] Verify search functionality
- [ ] Test comments on a post
- [ ] Check light/dark mode toggle

## Project Structure

```
src/
├── app/
│   ├── (site)/           # Static pages
│   │   ├── page.tsx      # Home
│   │   ├── about/
│   │   ├── projects/
│   │   └── contact/
│   ├── (content)/        # Content pages
│   │   ├── blog/
│   │   ├── tags/
│   │   ├── categories/
│   │   └── series/
│   ├── api/              # API routes
│   │   ├── views/
│   │   └── health/
│   ├── layout.tsx
│   ├── providers.tsx
│   ├── sitemap.ts
│   └── rss.xml/
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Header, Footer
│   ├── mdx-content.tsx
│   ├── search-dialog.tsx
│   ├── view-counter.tsx
│   ├── giscus.tsx
│   ├── theme-toggle.tsx
│   └── theme-provider.tsx
├── content/
│   └── posts/            # MDX blog posts
├── lib/
│   ├── content/          # Post utilities
│   ├── db/               # Database
│   └── utils.ts
└── styles/
    └── globals.css
```

## License

MIT
