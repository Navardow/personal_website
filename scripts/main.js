

// fetch all projects in the projects folder
async function fetchProjects() {
    const res = await fetch("./test/projects.json");
    return await res.json();
}

const d = await fetchProjects()
console.log(d);

const projects = d.projects;


// push to ul in homepage
const projectList = document.querySelector(".projects");
projects.forEach(p => { projectList.append(create_card(p)) })

// create cards
function create_card(project) {
    const project_item = document.createElement("li");
    project_item.classList.add("project-item");

    const project_card = document.createElement("div");
    project_card.classList.add("project-card");

    const project_title = document.createElement("h2");
    project_title.classList.add("project-title")
    project_title.textContent = project.title;

    const project_summary = document.createElement("p");
    project_summary.classList.add("summary");
    project_summary.textContent = project.summary;

    const project_card_foot = document.createElement("div");
    project_card_foot.classList.add("project-card-foot");

    const project_tags = document.createElement("ul");
    project_tags.classList.add("project-tags");
    project.tags.forEach((t) => {
        const tag = document.createElement("li");
        tag.textContent = t;
        project_tags.append(tag);
    });

    const project_link = document.createElement("a");
    project_link.classList.add("project_link");
    project_link.textContent = "Click to view →";

    project_card_foot.append(project_tags, project_link);
    project_card.append(project_title, project_summary, project_card_foot);
    project_item.append(project_card);

    return project_item;
}
