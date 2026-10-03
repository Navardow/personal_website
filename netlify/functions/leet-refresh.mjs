import { getStore } from "@netlify/blobs";

export default async () => {
    const username = "IskandarSubarashi";

    const query = `
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

    const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
        },
        body: JSON.stringify({ query, variables: { username } }),
    });

    if (!res.ok)
        throw new Error(
            `LeetCode responded ${res.status}: ${await res.text()}`,
        );

    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    const { data } = json;

    if (!data.matchedUser) throw new Error(`User "${username}" not found`);

    const store = getStore("stats-cache");
    await store.set("leet-stats", JSON.stringify(data));
};

export const config = { schedule: "@daily" };
