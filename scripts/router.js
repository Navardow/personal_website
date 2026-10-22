import { marked as convert } from "https://cdn.jsdelivr.net/npm/marked@18.0.5/+esm";
import { meta } from "./data.js";

const renderer = {
    image({ href, title, text }) {
        return `<img src="${href}" alt="${text}" class="md-img"${
            title ? ` title="${title}"` : ""
        }>`;
    },
    paragraph({ tokens }) {
        const text = this.parser.parseInline(tokens);
        return `<p class="md-p-text">${text}</p>`;
    },
};

convert.use({ renderer });

const routes = {};

const files = [
    ...(meta.projects ?? []).filter((p) => Object.hasOwn(p, "file")).map((p) => p.file),
    meta.about.file,
    meta.contact.file,
];

let routes_ready = false;

// one failed file must not block every route; missing ones fall through to the 404
Promise.allSettled(
    files.map(async (file) => {
        const res = await fetch(file);
        // the SPA fallback answers missing files with index.html, so a 200 isn't enough
        if (!res.ok || res.headers.get("content-type")?.includes("text/html")) return;
        router.set_route(file, convert(await res.text()));
    }),
).then(() => (routes_ready = true));

export const router = {
    initialized: false,

    async handle_route(path, { push = true } = {}) {
        if (push) window.history.pushState({}, "", path);
        window.current_location = path;
        router.set_title(path);

        const main_content = document.querySelector(".main-content");
        main_content.innerHTML = "<h3>loading...</h3>";
        const html = await router.get_route(path);
        router.set_title(path);

        // live elements (home, /projects) are moved in; markdown routes are strings
        if (html instanceof Node) {
            main_content.replaceChildren(html);
        } else {
            const page = path.slice(1);
            main_content.innerHTML = ["about", "contact"].includes(page)
                ? `<article class="page page-${page}">${html}</article>`
                : html;
        }
    },

    set_route(path, html_content) {
        routes[router.normalize_path(path)] = html_content;
    },

    set_title(path) {
        if (routes_ready && !Object.hasOwn(routes, path)) {
            document.title = "Not found";
            return;
        }
        const name = path.split("/").filter(Boolean).pop() ?? "Home";
        document.title = name.charAt(0).toUpperCase() + name.slice(1);
    },

    async get_route(path) {
        while (!routes_ready) {
            await new Promise((res) => setTimeout(res, 20));
        }
        return (
            routes[path] ??
            `<section class="intro">
                <p class="eyebrow">404</p>
                <h1 class="hero-name"><i>Page not found</i></h1>
                <p class="hero-tagline">What you're looking for doesn't exist.</p>
                <div class="hero-actions">
                    <a class="site-link btn btn-solid" href="/">Back home &rarr;</a>
                    <a class="site-link btn btn-ghost" href="/projects">View projects</a>
                </div>
            </section>`
        );
    },

    normalize_path(path) {
        return path
            .replace(window.location.origin, "")
            .replace("data/", "")
            .replace(".md", "");
    },
};
