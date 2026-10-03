async function uva_stats() {
    const origin = window.location.origin;
    const res = await fetch(`${origin}/uva-stats`);
    const data = await res.json();

    const submissions = document.getElementById("submissions");
    submissions.innerHTML = data.submissions.length;
    const solved = document.getElementById("solved");
    solved.innerHTML = data.accepted.length;
    const acceptance_per = document.getElementById("accepted");
    acceptance_per.innerHTML = `${(
        (data.accepted.length / data.submissions.length) *
        100
    ).toFixed(1)}%`;
}

async function leet_stats() {
    const origin = window.location.origin;
    const res = await fetch(`${origin}/leet-stats`);
    const data = await res.json();

    const stats = data.matchedUser.submitStats.acSubmissionNum;
    const totals = data.allQuestionsCount;

    const uname = document.getElementById("l-uname");
    uname.innerHTML = data.matchedUser.username;

    const lc_total = document.getElementById("lc-total");
    lc_total.innerHTML = `${stats[0].count} / 
    ${totals[0].count}`;

    const lc_easy = document.getElementById("lc-easy");
    lc_easy.innerHTML = `${stats[1].count} / ${totals[1].count}`;

    const lc_medium = document.getElementById("lc-medium");
    lc_medium.innerHTML = `${stats[2].count} / ${totals[2].count}`;

    const lc_hard = document.getElementById("lc-hard");
    lc_hard.innerHTML = `${stats[3].count} / ${totals[3].count}`;

    const lc_acc_rate = document.getElementById("lc-rate");

    const ar =
        stats[0].submissions /
        data.matchedUser.submitStats.totalSubmissionNum[0].submissions;

    lc_acc_rate.innerHTML = `${(ar * 100).toFixed(2)}%`;

    ["Easy", "Medium", "Hard"].forEach((level) => {
        const solved = stats.find((d) => d.difficulty === level).count;
        const total = totals.find((d) => d.difficulty === level).count;

        document
            .querySelector(`.leet-${level.toLowerCase()}-bar`)
            .style.setProperty("--progress", `${(solved / total) * 100}%`);

        document.getElementById(`lc-${level.toLowerCase()}`).textContent =
            `${solved} / ${total}`;
    });
}

export { uva_stats, leet_stats };
