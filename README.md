# Personal Website

My personal website and blog, built with Next.js, featuring MDX blog posts, full-text search, i18n (English & German), and static HTML export.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Content**: MDX via Velite
- **i18n**: next-intl (English & German)
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
- ✅ Internationalization (English & German)
- ✅ SEO optimized with sitemap
- ✅ OG image generation
- ✅ Light/dark mode with system preference
- ✅ Static export — deploy to any static host

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

```env
# Site URL for SEO
NEXT_PUBLIC_SITE_URL=https://tobias-lippert.de

# Giscus comments (optional)
NEXT_PUBLIC_GISCUS_REPO=tobias-lippert/personal-website
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

Your content here in MDX format.
```

### Frontmatter Schema

| Field         | Type         | Required | Description                     |
| ------------- | ------------ | -------- | ------------------------------- |
| `title`       | string       | Yes      | Post title                      |
| `description` | string       | Yes      | Brief description               |
| `publishDate` | string (ISO) | Yes      | Publication date                |
| `updatedDate` | string (ISO) | No       | Last update date                |
| `draft`       | boolean      | No       | Hide from production            |
| `tags`        | string[]     | No       | Post tags                       |
| `category`    | string       | No       | Post category                   |
| `series`      | string       | No       | Series name                     |
| `seriesOrder` | number       | No       | Order in series                 |
| `comments`    | boolean      | No       | Enable comments (default: true) |

### Publishing Rules

- Posts with `draft: true` are hidden in production
- Posts with `publishDate` in the future are hidden until that date
- The sitemap excludes unpublished posts

## Development

```bash
# Development server
npm run dev

# Build for production (static export to ./out)
npm run build

# Generate search index
npm run build:search

# Lint
npm run lint
```

## Deployment

After running `npm run build`, the `out/` folder contains the complete static site. Deploy to:

- **GitHub Pages**: Copy `out/` contents to your `gh-pages` branch
- **Netlify**: Connect your repo or drag & drop the `out/` folder
- **Vercel**: Works out of the box
- **AWS S3 / CloudFlare Pages / any static host**: Upload `out/` folder

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout
│   └── [locale]/
│       ├── layout.tsx        # Locale layout
│       ├── (site)/           # Static pages (home, about, contact)
│       └── (content)/        # Blog pages
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Header, Footer
│   ├── language-toggle.tsx
│   ├── search-dialog.tsx
│   └── theme-toggle.tsx
├── content/
│   └── posts/                # MDX blog posts
├── i18n/                     # Internationalization config
├── lib/
│   ├── content/              # Post utilities
│   ├── social.ts             # Centralized social links
│   └── utils.ts
├── styles/
│   └── globals.css
messages/
├── de.json                   # German translations
└── en.json                   # English translations
```

## License

MIT
