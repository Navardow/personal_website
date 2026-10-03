import { getStore } from "@netlify/blobs";

export default async () => {
    const store = getStore("stats-cache");
    const data = await store.get("leet-stats");
    if (data === null) return new Response("Not cached yet\n", { status: 404 });

    return new Response(data, {
        headers: { "content-type": "application/json" },
    });
};

export const config = { path: "/leet-stats" };
