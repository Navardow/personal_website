export default function init_theme_toggle() {
    const theme_toggle_btns = document.querySelectorAll(
        ".theme-toggle-buttons",
    );

    const set_theme = (theme) => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    };

    theme_toggle_btns.forEach((b) =>
        b.addEventListener("click", () => {
            // flip from the current theme, so a click anywhere on the button works
            const is_dark =
                document.documentElement.getAttribute("data-theme") === "dark";
            const toggle = () => set_theme(is_dark ? "light" : "dark");
            if (!document.startViewTransition) return toggle();
            document.startViewTransition(toggle);
        }),
    );
}
