import { getStore } from "@netlify/blobs";
import { logged } from "../lib/logged.mjs";
import { serveStats, STORE_NAME } from "../lib/stats.mjs";
import { refreshLeet, LEET_KEY } from "../lib/leet.mjs";

export default () => {
    const store = getStore(STORE_NAME);
    return serveStats({
        store,
        key: LEET_KEY,
        refresh: () => logged("LeetCode refresh (cache miss)", () => refreshLeet({ store })),
    });
};

export const config = { path: "/leet-stats" };
