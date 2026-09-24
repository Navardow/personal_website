import { getStore } from "@netlify/blobs";
import { cleaner } from "../../scripts/cleaner.js";

export default async () => {
    const start = Date.now();
    const date = new Date();

    console.log(`${date} Fetching UVa stats...`);
    try {
        const res = await fetch(
            "https://uhunt.onlinejudge.org/api/subs-user/1749010",
            {
                signal: AbortSignal.timeout(10000),
            },
        );

        if (!res.ok) {
            throw new Error(
                `uhunt fetch failed: ${res.status} ${res.statusText}`,
            );
        }

        const raw = await res.text();
        const cleaned = cleaner(JSON.parse(raw));

        const store = getStore("uva-stats-cache");
        await store.setJSON("uva-stats", cleaned);

        console.log(
            `${date}: Fetch completed in ${Date.now() - start}ms,\nrefreshed ${raw.length} bytes`,
        );
    } catch (error) {
        console.log(`${date}: Failed in ${Date.now() - start}ms\n${error}`);
    }
};

export const config = { schedule: "@daily" };
