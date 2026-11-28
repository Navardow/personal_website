import { getStore } from "@netlify/blobs";
import { logged } from "../lib/logged.mjs";
import { serveStats, STORE_NAME } from "../lib/stats.mjs";
import { refreshUva, UVA_KEY } from "../lib/uva.mjs";

export default () => {
    const store = getStore(STORE_NAME);
    return serveStats({
        store,
        key: UVA_KEY,
        refresh: () => logged("UVa refresh (cache miss)", () => refreshUva({ store })),
    });
};

export const config = { path: "/uva-stats" };
