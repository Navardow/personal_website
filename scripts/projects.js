function create_proj_card(project) {
    const project_item = document.createElement("li");
    project_item.classList.add("project-item");

    if (project.image) {
        const project_img = document.createElement("img");
        project_img.classList.add("project-img");
        project_img.src = project.image;
        project_img.alt = project.title;
        project_item.append(project_img);
    }

    const project_body = document.createElement("div");
    project_body.classList.add("project-body");

    const project_title = document.createElement("h3");
    project_title.classList.add("project-title");
    project_title.textContent = project?.title;

    const project_summary = document.createElement("p");
    project_summary.classList.add("project-summary");
    project_summary.textContent = project.summary;

    const project_card_foot = document.createElement("div");
    project_card_foot.classList.add("project-card-foot");

    const project_tags = document.createElement("ul");
    project_tags.classList.add("project-tags");
    project.tags?.forEach((t) => {
        const tag = document.createElement("li");
        tag.textContent = t;
        project_tags.append(tag);
    });

    const project_link = document.createElement("a");
    project_link.classList.add("project-link", "site-link");
    project_link.textContent = "Click to view →";

    project_card_foot.append(project_tags, project_link);
    project_body.append(project_title, project_summary, project_card_foot);
    project_item.append(project_body);

    return project_item;
}

export { create_proj_card };
