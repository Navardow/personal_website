export const LEET_KEY = "leet-stats";
const USERNAME = "IskandarSubarashi";

const QUERY = `
query userStats($username: String!) {
    allQuestionsCount { difficulty count }
    matchedUser(username: $username) {
        username
        profile { ranking }
        submitStats: submitStatsGlobal {
            acSubmissionNum { difficulty count submissions }
            totalSubmissionNum { difficulty count submissions }
        }
    }
    userContestRanking(username: $username) {
        rating
        globalRanking
        attendedContestsCount
        topPercentage
    }
}`;

export async function refreshLeet({ store, fetchFn = fetch, timeoutMs = 10_000 }) {
    const res = await fetchFn("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
        body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
        signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) {
        throw new Error(`LeetCode responded ${res.status}: ${await res.text()}`);
    }
    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    if (!json.data?.matchedUser) throw new Error(`User "${USERNAME}" not found`);

    await store.setJSON(LEET_KEY, json.data);
    return json.data;
}
