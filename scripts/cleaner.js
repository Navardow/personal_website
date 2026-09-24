export function cleaner({ subs: submissions }) {
    const accepted = submissions.filter((i) => i[2] == 90);

    const attempted_ids = new Set();
    submissions.forEach((e) => {
        attempted_ids.add(e[1]);
    });

    const acceptance_percentage = accepted.length / submissions.length;

    return {
        submissions,
        attempted_ids: [...attempted_ids],
        accepted,
        acceptance_percentage,
    };
}
