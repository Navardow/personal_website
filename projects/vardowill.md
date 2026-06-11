# VardoWill.com
A portfolio website, created to document my work and journey as a computer science student and aspiring software engineer.

### stack
- *JavaScript*
- *HTML*
*CSS*

The site is very simple, lean, and intentional.

### Some features.
- It is designed as an single page application (SPA).
- After initaial page load, All resiurces needed for the site to function is then subsequently retrieved from the server in parrallel in the background.
- A custom implemented SPA router used to navigate and traverse the site.

### Design decisions
1. Optimizing for parallel resources fetching once initial page is loaded.

```JavaScript
export const router = {

    initialized: false,

    async handle_route(path) {
        const main_content = document.querySelector(".main-content");
        main_content.innerHTML = "<h1> place holder</h1>"
        const html = await router.get_route(path)
        main_content.innerHTML = html;
    },

    set_route(path, html_content) {
        routes[router.normalize_path(path)] = html_content;
    },

    async get_route(path) {
        while (!routes_ready) {
            await new Promise(res => setTimeout(res, 20));
        }
        return routes[path] ?? "<h2 style='text-align: center'> Will put cool 404 soon... maybe<br>What you're looking for does not exist, head back to home page.</h2>";

    },

    normalize_path(path) {
        return path.replace(window.location.origin, "").replace("data/", "").replace(".md", "")
    }
}

```


