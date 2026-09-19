import { getStore } from "@netlify/blobs";

export default async () => {
    const store = getStore("uva-stats-cache");
    const res = await fetch(
        "https://uhunt.onlinejudge.org/api/subs-user/1749010",
    );
    const data = await res.text();
    await store.set("uva-stats", data);
    console.log("refreshed", data.length, "bytes");
};

export const config = { schedule: "@daily" };

/*
 * clean and organize data before storing
 *
 * */
