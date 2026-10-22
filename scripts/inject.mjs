// root is the home element; it may be detached if the user navigated away while loading
async function uva_stats(root = document) {
    const el = (id) => root.querySelector(`#${id}`);
    const origin = window.location.origin;
    const res = await fetch(`${origin}/uva-stats`);
    if (!res.ok) {
        ["submissions", "solved", "accepted"].forEach(
            (id) => (el(id).textContent = "unavailable"),
        );
        return;
    }
    const data = await res.json();

    const submissions = el("submissions");
    submissions.textContent = data.submissions.length;
    const solved = el("solved");
    solved.textContent = data.accepted.length;
    const acceptance_per = el("accepted");
    acceptance_per.textContent = `${(
        (data.accepted.length / data.submissions.length) *
        100
    ).toFixed(1)}%`;
}

async function leet_stats(root = document) {
    const el = (id) => root.querySelector(`#${id}`);
    const origin = window.location.origin;
    const res = await fetch(`${origin}/leet-stats`);
    if (!res.ok) {
        [
            "l-uname",
            "lc-total",
            "lc-easy",
            "lc-medium",
            "lc-hard",
            "lc-rate",
        ].forEach((id) => (el(id).textContent = "unavailable"));
        return;
    }
    const data = await res.json();

    const stats = data.matchedUser.submitStats.acSubmissionNum;
    const totals = data.allQuestionsCount;

    const uname = el("l-uname");
    uname.textContent = data.matchedUser.username;

    const lc_total = el("lc-total");
    lc_total.textContent = `${stats[0].count} / ${totals[0].count}`;

    const lc_acc_rate = el("lc-rate");

    const ar =
        stats[0].submissions /
        data.matchedUser.submitStats.totalSubmissionNum[0].submissions;

    lc_acc_rate.textContent = `${(ar * 100).toFixed(2)}%`;

    ["Easy", "Medium", "Hard"].forEach((level) => {
        const solved = stats.find((d) => d.difficulty === level).count;
        const total = totals.find((d) => d.difficulty === level).count;

        root.querySelector(
            `.leet-${level.toLowerCase()}-bar`,
        ).style.setProperty("--progress", `${(solved / total) * 100}%`);

        el(`lc-${level.toLowerCase()}`).textContent = `${solved} / ${total}`;
    });
}

export { uva_stats, leet_stats };
