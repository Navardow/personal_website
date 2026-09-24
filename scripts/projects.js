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
    //project_link.href = router.normalize_path(project.file);

    project_card_foot.append(project_tags, project_link);
    project_card.append(project_title, project_card_foot);
    project_item.append(project_card);

    return project_item;
}

export { create_proj_card };
