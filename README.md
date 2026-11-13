# AB.Tours

AB.Tours is built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `npm run lint` for ESLint
and `npm run build` to create a production build; `npm start` serves that build.

## Routes

- `/` and `/ar` are the English and Arabic home pages.
- Other published sitemap URLs are rendered by the `[...slug]` App Router page,
  including their `/ar/...` mirrors.
- `/admin`, `/admin/pages`, `/admin/sitemap`, and `/admin/enquiries` are the CMS
  screens.

CMS endpoints are implemented as App Router Route Handlers under `/api`:
`/api/pages`, `/api/pages/[nodeId]`, `/api/pages/reset`, `/api/enquiries`,
`/api/enquiries/[id]`, and `/api/health`.

The local CMS store is `data/cms-store.json`. It is initialized from the
TypeScript sitemap seed when the store is absent or invalid.
# ab-tours
