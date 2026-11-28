import { getStore } from "@netlify/blobs";
import { logged } from "../lib/logged.mjs";
import { STORE_NAME } from "../lib/stats.mjs";
import { refreshLeet } from "../lib/leet.mjs";

export default () =>
    logged("LeetCode refresh", () => refreshLeet({ store: getStore(STORE_NAME) }));

export const config = { schedule: "@daily" };
