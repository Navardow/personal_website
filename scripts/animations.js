// underline
export function persistent_underline() {
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
