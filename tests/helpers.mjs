export function fakeStore(initial = {}) {
    const data = { ...initial };
    return {
        data,
        get: async (key) => data[key] ?? null,
        setJSON: async (key, value) => { data[key] = JSON.stringify(value); },
    };
}

export const respondWith = (body, status = 200) => async () =>
    new Response(typeof body === "string" ? body : JSON.stringify(body), { status });

// A fake fetch that never answers; it only rejects when the caller's timeout fires
export const hangingFetch = (_url, { signal }) =>
    new Promise((_, reject) => signal.addEventListener("abort", () => reject(signal.reason)));
