# personal_website

My portfolio site, built with vanilla HTML, CSS and JavaScript (no framework, no build step) and deployed on Netlify.

**Live:** <!-- add site URL -->

## Features

- **Single-page app with a custom router.** Navigation uses the History API. Pages are written in Markdown, fetched in parallel on first load, and rendered with [marked](https://marked.js.org/).
- **Content in data files.** Projects, the About page and the Contact page are driven by `data/meta.json` and the Markdown files in `data/`.
- **Live coding stats.** The home page shows a quick look at my [UVa Online Judge](https://uhunt.onlinejudge.org/id/1749010) and [LeetCode](https://leetcode.com/u/IskandarSubarashi/) progress. Stats are fetched daily by scheduled Netlify Functions and cached in Netlify Blobs.
- **Projects timeline.** An SVG timeline fills in as you scroll.
- **Light/dark theme** that remembers your choice.

## Project structure

```
index.html              # app shell + home page
data/
  meta.json             # site metadata and project list
  about.md, contact.md  # page content
  projects/*.md         # one Markdown file per project
scripts/
  main.js               # entry point
  router.js             # SPA router + Markdown rendering
  inject.mjs            # renders UVa / LeetCode stats
  cleaner.js            # processes raw uHunt submissions
  timeline.js           # projects timeline
  theme-toggle.js, underline.js, card.js, projects.js, data.js
styles/                 # CSS split by section
netlify/functions/
  uva-refresh.mjs       # @daily: fetch uHunt -> blob cache
  leet-refresh.mjs      # @daily: fetch LeetCode GraphQL -> blob cache
  uva-stats.mjs         # GET /uva-stats
  leet-stats.mjs        # GET /leet-stats
netlify.toml            # SPA fallback redirect
```

## Running locally

```bash
npm install
npx netlify dev      # full site incl. functions at http://localhost:8888
```

`npm run dev` starts a plain browser-sync server with live reload. It doesn't run the Netlify Functions, so the stats will show "unavailable".

To fill the stats cache locally, invoke the refresh functions:

```bash
npx netlify functions:invoke uva-refresh
npx netlify functions:invoke leet-refresh
```

## Adding a project

1. Write `data/projects/<slug>.md`.
2. Add an entry to `projects` in `data/meta.json`:
   ```json
   {
     "file": "/data/projects/<slug>.md",
     "title": "Project Title",
     "image": "/assets/<path>.png",
     "featured": true,
     "summary": "One-line description.",
     "tags": ["tag1", "tag2"]
   }
   ```
   The page is served at `/projects/<slug>`. `featured: true` also shows it on the home page.

## Deployment

Pushing to `main` deploys the site on Netlify. The refresh functions are scheduled with `config.schedule = "@daily"`.
