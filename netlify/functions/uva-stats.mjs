// netlify/functions/uva-stats.js  (public)
import { getStore } from "@netlify/blobs";

export default async () => {
    const store = getStore("uva-stats-cache");
    const data = await store.get("uva-stats");
    if (data === null) return new Response("Not cached yet", { status: 404 });
    return new Response(data, {
        headers: { "Content-Type": "application/json" },
    });
};

export const config = { path: "/uva-stats" };

//export default async (req) => {
//    const store = getStore("api-cache");
//    const apiURL = `https://uhunt.onlinejudge.org/api/subs-user/1749010`;
//
//    // Try to get the response from the store.
//    const cached = await store.getWithMetadata(apiURL, { type: "stream" });
//
//    // If it exists in the store, return it.
//    if (cached !== null) {
//        return new Response(cached.data, {
//            headers: new Headers(cached.metadata.headers),
//            status: cached.metadata.status,
//        });
//    }
//
//    // If it doesn't exist, make the HTTP call and cache the
//    // response in the store.
//    const response = await fetch(apiURL);
//    const body = await response.arrayBuffer();
//
//    await store.set(apiURL, body, {
//        metadata: {
//            headers: [...response.headers],
//            status: response.status,
//        },
//    });
//    console.log(body);
//    return new Response(body, response);
//};
//
//export const config = {
//    //path: "/uva-stats",
//    schedule: "@daily",
//};
