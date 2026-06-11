import { marked as convert } from "https://cdn.jsdelivr.net/npm/marked/+esm";
import { meta } from "./data.js";

const routes = {};

const files = meta.projects
    ?.map((p) => {
        if (Object.hasOwn(p, "file")) return fetch(p.file);
    })
    .filter((p) => p != null);

files.push(fetch(meta.about.file), fetch(meta.contact.file));

const files_promises = Promise.all(files);

let routes_ready = false;

files_promises.then(async (r) => {
    await Promise.all(
        r.map((item) =>
            item?.text().then((t) => {
                return router.set_route(item.url, convert(t));
            }),
        ),
    );
    routes_ready = true;
});

export const router = {
    initialized: false,

    async handle_route(path) {
        window.history.pushState({}, "", path);
        window.current_location = path;
        const main_content = document.querySelector(".main-content");
        main_content.innerHTML = "<h1> place holder</h1>";
        const html = await router.get_route(path);
        main_content.innerHTML = html;
    },

    set_route(path, html_content) {
        routes[router.normalize_path(path)] = html_content;
    },

    async get_route(path) {
        while (!routes_ready) {
            await new Promise((res) => setTimeout(res, 20));
        }
        return (
            routes[path] ??
            `<h2 style='text-align: center'>404<br>
            What you're looking 
            for doesn't exist, head back to home page.</h2><br>
            <div style='text-align: center;'>
            <button style='border-radius: .7rem' onClick="router.handle_route('/')">Go Home</button>
            </div>`
        );
    },

    normalize_path(path) {
        return path
            .replace(window.location.origin, "")
            .replace("data/", "")
            .replace(".md", "");
    },
};
