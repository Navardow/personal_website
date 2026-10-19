const SVG_NS = "http://www.w3.org/2000/svg";

export default function init_project_timeline(timeline) {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.classList.add("timeline-svg");
    const track = document.createElementNS(SVG_NS, "path");
    track.classList.add("timeline-track");
    const progress = document.createElementNS(SVG_NS, "path");
    progress.classList.add("timeline-progress");
    svg.append(track, progress);
    timeline.prepend(svg);

    let points = [];
    let dots = [];
    let total = 0;

    function layout() {
        if (!timeline.isConnected) return;
        const box = timeline.getBoundingClientRect();
        const cards = [...timeline.querySelectorAll(".project-card")];

        points = [];
        cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            const x = r.left + r.width / 2 - box.left;
            const top = r.top - box.top;
            if (i > 0) {
                const prev = points[points.length - 1];
                const mid = (prev.y + top) / 2;
                points.push({ x: prev.x, y: mid }, { x, y: mid });
            }
            points.push({ x, y: top, dot: true });
            if (i < cards.length - 1) points.push({ x, y: r.bottom - box.top });
        });

        dots.forEach(({ el }) => el.remove());
        dots = [];
        total = 0;
        points.forEach((p, i) => {
            if (i > 0) {
                total += Math.abs(p.x - points[i - 1].x) + Math.abs(p.y - points[i - 1].y);
            }
            if (!p.dot) return;
            const el = document.createElement("span");
            el.classList.add("timeline-dot");
            el.style.left = `${p.x}px`;
            el.style.top = `${p.y}px`;
            timeline.append(el);
            dots.push({ el, y: p.y });
        });

        const d = points.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
        track.setAttribute("d", d);
        progress.setAttribute("d", d);
        progress.style.strokeDasharray = total;
        update();
    }

    function update() {
        if (!timeline.isConnected || !points.length) return;
        const target = window.innerHeight / 2 - timeline.getBoundingClientRect().top;

        let drawn = 0;
        for (let i = 1; i < points.length; i++) {
            const a = points[i - 1];
            const b = points[i];
            if (target >= b.y) {
                drawn += Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
                continue;
            }
            if (target > a.y) drawn += target - a.y;
            break;
        }

        progress.style.strokeDashoffset = total - drawn;
        dots.forEach(({ el, y }) => el.classList.toggle("active", target >= y));
    }

    new ResizeObserver(layout).observe(timeline);
    window.addEventListener("scroll", update, { passive: true });
}
