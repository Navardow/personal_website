export default function init_theme_toggle() {
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
