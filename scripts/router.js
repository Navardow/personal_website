import { parse as convert } from 'https://cdn.jsdelivr.net/npm/marked/+esm';
import { meta } from "./data.js";

const project_files = meta.projects.map(p => fetch(p.file));
const project_promises = Promise.all(project_files);

const routes = {}
let cache_ready = false;
console.log(window.location.pathname)

project_promises.then(async (r) => {
    await Promise.all(
        r.map(item => item.text().then(t => {
            console.log(router.normalize_path(item.url));
            return routes[router.normalize_path(item.url)] = convert(t);
        }))
    );
    //await new Promise(res => setTimeout(res, 10000));
    cache_ready = true;
    console.log(cache_ready, routes);
});


export const router = {

    initialized: false,

    async handle_route(path) {
        //console.log(routes[path], path)
        //console.log(routes["/"])
        console.log(path)
        const main_content = document.querySelector(".main-content");
        const html = await router.get_route(router.normalize_path(path))
        main_content.innerHTML = html;
        // console.log(routes[path])
    },

    set_route(path, html_content) {
        routes[router.normalize_path(path)] = html_content;
    },

    async get_route(path) {
        console.log(path, "in get route")
        while (!cache_ready) {
            await new Promise(res => setTimeout(res, 20));
            console.log("here")
        }
        console.log(path, "jkal");
        return routes[path] ?? "<h1> 404 </h1>";
    },

    init_router() {
        router.initialized = !router.initialized;
    },

    normalize_path(path) {
        const pathh = path.replace(window.location.origin, "").replace(".md", "")
        console.log(path, pathh, "in normalize")
        return pathh
    }
}











