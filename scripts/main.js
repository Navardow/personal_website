

async function main() {

    const d = await fetch_projects("./test/projects.json");
    const featured = d.projects;

    // push to ul in homepage
    const featuredList = document.querySelector(".featured-list");
    featured.forEach(p => featuredList.append(create_card(p)))


    init_theme_toggle();
}

main();

// fetch all projects in the projects folder
async function fetch_projects(path) {
    const res = await fetch(path);
    return await res.json();
}

//theme-toggle
function init_theme_toggle() {

    const theme_toggle_btn = document.querySelector(".theme-toggle");
    console.log(theme_toggle_btn)
    theme_toggle_btn.addEventListener("click", () => {
        console.log("hello from theme theme-toggle button");
    });

    localStorage.setItem("theme", "dark");
}

// create cards
function create_card(project) {
    const featured_item = document.createElement("li");
    featured_item.classList.add("featured-item");

    const featured_card = document.createElement("div");
    featured_card.classList.add("featured-card");

    const featured_title = document.createElement("h2");
    featured_title.classList.add("featured-title")
    featured_title.textContent = project.title;

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
    featured_link.classList.add("featured-link");
    featured_link.textContent = "Click to view →";

    featured_card_foot.append(featured_tags, featured_link);
    featured_card.append(featured_title, featured_summary, featured_card_foot);
    featured_item.append(featured_card);

    return featured_item;
}
