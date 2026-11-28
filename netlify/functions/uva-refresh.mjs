import { getStore } from "@netlify/blobs";
import { logged } from "../lib/logged.mjs";
import { STORE_NAME } from "../lib/stats.mjs";
import { refreshUva } from "../lib/uva.mjs";

export default () =>
    logged("UVa refresh", () => refreshUva({ store: getStore(STORE_NAME) }));

export const config = { schedule: "@daily" };
