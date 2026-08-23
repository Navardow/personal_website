import { meta } from "./data.js";
import { router } from "./router.js";

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
    featured?.forEach((p) => featuredList.append(create_card(p)));
}

//theme-toggle
function init_theme_toggle() {
    const theme_pref = localStorage.getItem("theme");
    const dark_btn = document.querySelector(".theme-toggle-dark");
    const light_btn = document.querySelector(".theme-toggle-light");
    const dark_logo = document.querySelector(".dark-logo-icon");
    const light_logo = document.querySelector(".light-logo-icon");
    const theme_toggle_btns = document.querySelectorAll(
        ".theme-toggle-buttons",
    );

    const set_light = () => {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
        light_btn.style.display = "block";
        dark_btn.style.display = "none";
        light_logo.style.display = "none";
        dark_logo.style.display = "block";
    };

    const set_dark = () => {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        light_btn.style.display = "none";
        dark_btn.style.display = "block";
        light_logo.style.display = "block";
        dark_logo.style.display = "none";
    };

    theme_pref == "dark" ? set_dark() : set_light();

    theme_toggle_btns.forEach((b) =>
        b.addEventListener("click", (e) => {
            e.target === light_btn ? set_dark() : set_light();
        }),
    );
}

// underline
function persistent_underline() {
    // grab all nav links on page load
    const links = document.querySelectorAll(".site-link");

    // add event listener to all, wh
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            document.querySelectorAll(".site-link").forEach((link) => {
                link.classList.remove("active");
            });
            e.target.closest(".site-link").classList.add("active");
        });
    });
}

// create cards
function create_card(project) {
    const featured_item = document.createElement("li");
    featured_item.classList.add("featured-item");

    const featured_card = document.createElement("div");
    featured_card.classList.add("featured-card");

    const featured_title = document.createElement("h3");
    featured_title.classList.add("featured-title");
    featured_title.textContent = project?.title;

    const featured_summary_btn = document.createElement("button");
    featured_summary_btn.classList.add("sum-btn");
    featured_summary_btn.textContent = "Summary";

    const featured_summary = document.createElement("p");
    featured_summary.classList.add("featured-summary");
    featured_summary.textContent = project.summary;

    const featured_card_foot = document.createElement("div");
    featured_card_foot.classList.add("featured-card-foot");

    const featured_tags = document.createElement("ul");
    featured_tags.classList.add("featured-tags");
    project.tags?.forEach((t) => {
        const tag = document.createElement("li");
        tag.textContent = t;
        featured_tags.append(tag);
    });

    const featured_link = document.createElement("a");
    featured_link.classList.add("featured-link", "site-link");
    featured_link.textContent = "Click to view →";
    featured_link.href = router.normalize_path(project.file);

    featured_card_foot.append(featured_tags, featured_link);
    featured_card.append(
        featured_title,
        featured_summary_btn,
        featured_summary,
        featured_card_foot,
    );
    featured_item.append(featured_card);

    return featured_item;
}

/*
 * WIP
 * */

function create_proj_card(project) {
    const project_item = document.createElement("li");
    project_item.classList.add("project-item");

    const project_card = document.createElement("div");
    project_card.classList.add("project-card");

    const project_title = document.createElement("h3");
    project_title.classList.add("featured-title");
    project_title.textContent = project?.title;

    const project_summary = document.createElement("p");
    project_summary.classList.add("featured-summary");
    project_summary.textContent = project.summary;

    const project_card_foot = document.createElement("div");
    project_card_foot.classList.add("featured-card-foot");

    const project_tags = document.createElement("ul");
    project_tags.classList.add("featured-tags");
    project.tags?.forEach((t) => {
        const tag = document.createElement("li");
        tag.textContent = t;
        project_tags.append(tag);
    });

    const project_link = document.createElement("a");
    project_link.classList.add("featured-link", "site-link");
    project_link.textContent = "Click to view →";
    project_link.href = router.normalize_path(project.file);

    project_card_foot.append(project_tags, project_link);
    project_card.append(project_title, project_card_foot);
    project_item.append(project_card);

    return project_item;
}

function projects_page() {
    const project_list = document.createElement("ul");
    project_list.classList.add("project-list");
    meta.projects?.forEach((p) => {
        project_list.append(create_proj_card(p));
    });
    router.set_route("/projects", project_list);
}
