// underline the nav link for the current section (/projects/x keeps "Projects" active)
export function set_active_link(path) {
    document.querySelectorAll(".nav-links .site-link").forEach((link) => {
        const href = new URL(link.href).pathname;
        link.classList.toggle(
            "active",
            path === href || path.startsWith(`${href}/`),
        );
    });
}
