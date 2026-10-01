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

export { uva_stats };
