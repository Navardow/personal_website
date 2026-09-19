import { meta } from "./data.js";
import { router } from "./router.js";
import { persistent_underline } from "./animations.js";
import { create_proj_card } from "./projects.js";
import create_card from "./card.js";
import init_theme_toggle from "./theme-toggle.js";

await main();

router.set_route("/", document.querySelector(".main-content").innerHTML);
window.onpopstate = () => router.handle_route(window.location.pathname);
window.router = router;
window.current_location = window.location.pathname;

if (window.location.pathname !== "/") {
    router.handle_route(window.location.pathname);
}

async function main() {
    projects_page();
    const featured = meta.projects.filter((p) => p.featured == true);
    init_theme_toggle();
    init_featured_section(featured);
    persistent_underline();

    document.addEventListener("click", async (e) => {
        const link = e.target.closest(".site-link");

        if (!link) return;
        e.preventDefault();
        await router.handle_route(new URL(link.href).pathname);
    });
}

function init_featured_section(featured) {
    const featuredList = document.querySelector(".featured-list");
    featured?.forEach((p) => {
        const card = create_card(p);
        card.querySelector(".site-link").href = router.normalize_path(p.file);
        featuredList.append(card);
    });
}

function projects_page() {
    const project_list = document.createElement("ul");
    project_list.classList.add("project-list");
    meta.projects?.forEach((p) => {
        const card = create_proj_card(p);
        card.querySelector(".site-link").href = router.normalize_path(p.file);
        project_list.append(card);
    });
    router.set_route("/projects", project_list);
}
