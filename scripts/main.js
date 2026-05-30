import { router } from './router.js';
import { meta } from "./data.js"

const main_container = document.querySelector(".main-content");

function update_main_content(html_content) {

}

function init_site_links() {
    const site_links = [...document.querySelectorAll(".site-link")];
    site_links.forEach((p) => {
        p.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(e.target.href)
            router(e.target.href);
        })
    })
}

function init_featured_section(featured) {
    const featuredList = document.querySelector(".featured-list");
    featured.forEach(p => featuredList.append(create_card(p)));
}

//theme-toggle
function init_theme_toggle() {
    const theme_pref = localStorage.getItem("theme");
    const dark_btn = document.querySelector(".theme-toggle-dark");
    const light_btn = document.querySelector(".theme-toggle-light");
    const dark_logo = document.querySelector(".dark-logo-icon");
    const light_logo = document.querySelector(".light-logo-icon");
    const theme_toggle_btns = document.querySelectorAll(".theme-toggle-buttons");


    const set_light = () => {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
        light_btn.style.display = "block";
        dark_btn.style.display = "none";
        light_logo.style.display = "none";
        dark_logo.style.display = "block";
    }

    const set_dark = () => {
        localStorage.setItem("theme", "dark")
        document.documentElement.setAttribute("data-theme", "dark");
        light_btn.style.display = "none";
        dark_btn.style.display = "block";
        light_logo.style.display = "block";
        dark_logo.style.display = "none";
    }

    theme_pref == "dark" ? set_dark() : set_light();

    theme_toggle_btns.forEach(b => b.addEventListener("click", (e) => {
        e.target === light_btn ? set_dark() : set_light();
    }));
}

// create cards
function create_card(project) {
    const featured_item = document.createElement("li");
    featured_item.classList.add("featured-item");

    const featured_card = document.createElement("div");
    featured_card.classList.add("featured-card");

    const featured_title = document.createElement("h3");
    featured_title.classList.add("featured-title")
    featured_title.textContent = project.title;

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
    project.tags.forEach((t) => {
        const tag = document.createElement("li");
        tag.textContent = t;
        featured_tags.append(tag);
    });

    const featured_link = document.createElement("a");
    featured_link.classList.add("featured-link", "site-link");
    featured_link.textContent = "Click to view →";
    featured_link.href = project.file;

    featured_card_foot.append(featured_tags, featured_link);
    featured_card.append(featured_title, featured_summary_btn, featured_summary, featured_card_foot);
    featured_item.append(featured_card);

    return featured_item;
}

function main() {
    const featured = meta.projects.filter(p => p.featured == true)
    init_theme_toggle();
    init_featured_section(featured);
    init_site_links();
}
main();
