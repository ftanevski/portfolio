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

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env` file in the root directory:

```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

### Sanity Studio Setup

1. Navigate to the Sanity folder and install dependencies:

```bash
cd sanity
npm install
```

2. Update `sanity/sanity.config.ts` with your Sanity project ID.

3. Run Sanity Studio locally:

```bash
npm run dev
```

4. Access the studio at `http://localhost:3333` and start adding content.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

### Building

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

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

## Deployment to Cloudflare Pages

1. Push your code to a Git repository (GitHub, GitLab)

2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → Create a project

3. Connect your repository and configure:
   - **Build command:** `npm run build`
   - **Build output directory:** `.svelte-kit/cloudflare`

4. Add environment variables:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
   - `VITE_SANITY_API_VERSION`

5. Deploy! Your site will be live at `your-project.pages.dev`

### Free Tier Includes

- Unlimited bandwidth
- 500 builds per month
- Global CDN
- Automatic HTTPS

## Customization

### Theming

Edit CSS variables in `src/app.css`:

- `:root` for light theme
- `[data-theme='dark']` for dark theme

### Translations

Add/edit translations in:

- `src/lib/i18n/en.json` (English)
- `src/lib/i18n/mk.json` (Macedonian)

### Adding Languages

1. Create new translation file in `src/lib/i18n/`
2. Register it in `src/lib/i18n/index.ts`
3. Add to `locales` array

## License

MIT
