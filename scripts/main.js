import { meta } from "./data.js";
import { router } from "./router.js";
import { set_active_link } from "./underline.js";
import { create_proj_card } from "./projects.js";
import create_card from "./card.js";
import init_theme_toggle from "./theme-toggle.js";
import { uva_stats, leet_stats } from "./inject.mjs";

const home = document.querySelector(".home");

projects_page();
init_theme_toggle();
init_featured_section(meta.projects.filter((p) => p.featured == true));
router.set_route("/", home);

// stats fill in the background, into the home element wherever it currently is
Promise.allSettled([uva_stats(home), leet_stats(home)]);

document.addEventListener("click", (e) => {
    const link = e.target.closest(".site-link");

    // let modified / non-left clicks open new tabs as usual
    if (!link || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
    e.preventDefault();
    navigate(new URL(link.href).pathname);
});

window.onpopstate = () => navigate(window.location.pathname, { push: false });
window.router = router;
window.current_location = window.location.pathname;

if (window.location.pathname !== "/") {
    navigate(window.location.pathname, { push: false });
} else {
    set_active_link("/");
}

async function navigate(path, options) {
    set_active_link(path);
    await router.handle_route(path, options);
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
