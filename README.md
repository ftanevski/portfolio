# Portfolio - SvelteKit + Sanity CMS

A modern, bilingual (EN/MK) developer portfolio built with SvelteKit and Sanity CMS, featuring dark/light themes and responsive design.

## Features

- **SvelteKit** - Modern, fast web framework
- **Sanity CMS** - Headless CMS for content management
- **TailwindCSS** - Utility-first CSS framework
- **i18n** - English and Macedonian language support
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-first with adaptive navigation
- **Cloudflare Pages** - Free hosting with global CDN

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Sanity account (free tier available)

## Project Structure

```
portfolio/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable UI components
│   │   ├── sanity/         # Sanity client & queries
│   │   ├── i18n/           # Translation files
│   │   └── stores/         # Svelte stores
│   ├── routes/
│   │   ├── +layout.svelte  # Global layout
│   │   └── +page.svelte    # Home page
│   └── app.css             # Global styles
├── sanity/                 # Sanity Studio
│   └── schemas/            # Content schemas
└── static/                 # Static assets
```

## Content Management

All content is managed through Sanity CMS:

- **Site Settings** - Hero content, social links, email
- **Projects** - Portfolio projects with images, tech tags
- **Experience** - Work, Education, Extracurricular entries
- **Skills** - Categorized skills list

## License

MIT
