export const STORE_NAME = "stats-cache";

export async function serveStats({ store, key, refresh }) {
    const cached = await store.get(key);
    if (cached !== null) return jsonResponse(cached);
    try {
        return jsonResponse(JSON.stringify(await refresh()));
    } catch {
        return new Response("Stats unavailable\n", { status: 503 });
    }
}

const jsonResponse = (body) =>
    new Response(body, { headers: { "content-type": "application/json" } });
