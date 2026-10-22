## Portfolio

_A portfolio website, created to document my work and journey as a computer science student and aspiring software engineer._
_Built with no frameworks: just HTML, CSS, and JavaScript running natively in the browser._

### Stack

- &emsp;_JavaScript_ (ES modules)
- &emsp;_HTML_
- &emsp;_CSS_
- &emsp;_Marked_: Markdown to HTML conversion
- &emsp;_Netlify_: hosting, serverless functions, and Blob storage

### Features

1. Single page application (SPA) with a custom router.
2. Content written in Markdown and indexed by a single `meta.json` file.
3. All pages fetched in parallel in the background on first load, then served from memory.
4. Light/dark theme toggle saved across visits, animated with the View Transitions API.
5. Live UVa Online Judge and LeetCode stats, refreshed daily by scheduled serverless functions.

### How it works

**Content: `meta.json`**  
Everything the site shows is listed in `/data/meta.json`. Each project entry points to a Markdown
file and holds the data used to build its card:

- &emsp;`file`: path to the Markdown write-up
- &emsp;`title`, `summary`, `tags`, `image`: card contents
- &emsp;`featured`: if `true`, the project also appears on the home page

Adding a new project means writing a `.md` file in `/data/projects/` and adding one entry to `meta.json`.
No HTML needed.

**Router**  
When the page loads, the router fetches every Markdown file in `meta.json` (plus About and Contact)
at the same time with `Promise.all`. Each file is converted to HTML with Marked and stored in a
routes table under a cleaned-up path, so `/data/projects/dotfiles.md` becomes `/projects/dotfiles`.

Clicks on any `.site-link` are intercepted. The router pushes the new path with the History API,
updates the page title, and swaps in the HTML for that route. The back and forward buttons are
handled through `popstate`. If a route is requested before the files finish loading, the router
waits until they're ready. Unknown paths get a 404 page with a button back home.

Deep links (e.g. visiting `/projects/dotfiles` directly) work because Netlify redirects every
path to `index.html`, and the router renders the matching route once it loads.

**Markdown rendering**  
Marked uses a custom renderer that adds classes to images and paragraphs, so write-ups
pick up the site's styling without any HTML inside the Markdown.

**Coding stats**  
I've been taking an interest in algorithmic programming, solving problems on UVa Online Judge
and LeetCode. I wanted the home page to show that progress without me updating numbers by hand,
and without every visitor's page load hitting those sites' APIs.

Neither site offers a simple embeddable widget, so the stats are collected server-side and cached.
The stat cards on the home page come from four Netlify functions:

- &emsp;`uva-refresh` / `leet-refresh`: run on a daily schedule, fetch my submissions from
  the uHunt API and the LeetCode GraphQL API, and cache the results in Netlify Blobs.
- &emsp;`uva-stats` / `leet-stats`: serve the cached data at `/uva-stats` and `/leet-stats`.

The browser only reads the cache, so page loads never wait on (or hammer) third-party APIs.
Both requests run with `Promise.allSettled`, so if one fails, its card shows "unavailable"
and the rest of the site still works.

### Design decisions

1. Parallel resource fetching once the initial page loads, so moving between pages is instant afterward.
2. No framework, for full control and creativity.
3. Vanilla stack, to experiment with core language and browser features.
4. Content kept separate from code: writing a new post shouldn't mean touching JavaScript.

### Running locally

    npm install
    npm run dev          # static site with live reload (browser-sync)
    npx netlify dev      # include the serverless stat functions

### Code

Link: https://www.github.com/navardow/personal_website

<br>
<br>
<br>

_Navardo Williams - Oct 21, 2026_
