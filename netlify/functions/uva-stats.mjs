import { getStore } from "@netlify/blobs";

export default async () => {
    const store = getStore("uva-stats-cache");
    const data = await store.get("uva-stats");
    if (data === null) return new Response("Not cached yet\n", { status: 404 });
    return new Response(data, {
        headers: { "Content-Type": "application/json" },
    });
};

export const config = { path: "/uva-stats" };
