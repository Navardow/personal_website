import { cleaner } from "./cleaner.mjs";

export const UVA_KEY = "uva-stats";
const UVA_URL = "https://uhunt.onlinejudge.org/api/subs-user/1749010";

export async function refreshUva({ store, fetchFn = fetch, timeoutMs = 10_000 }) {
    const res = await fetchFn(UVA_URL, { signal: AbortSignal.timeout(timeoutMs) });
    if (!res.ok) {
        throw new Error(`uhunt fetch failed: ${res.status} ${res.statusText}`);
    }
    const cleaned = cleaner(await res.json());
    await store.setJSON(UVA_KEY, cleaned);
    return cleaned;
}
