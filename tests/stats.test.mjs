import { test } from "node:test";
import assert from "node:assert/strict";
import { serveStats } from "../netlify/lib/stats.mjs";
import { fakeStore } from "./helpers.mjs";

test("stats: serves cached data without refreshing", async (t) => {
    const store = fakeStore({ k: '{"n":1}' });
    const refresh = t.mock.fn(async () => ({ n: 2 }));
    const res = await serveStats({ store, key: "k", refresh });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { n: 1 });
    assert.equal(refresh.mock.callCount(), 0);
});

test("stats: on a cache miss, refreshes and serves fresh data", async (t) => {
    const store = fakeStore();
    const refresh = t.mock.fn(async () => ({ n: 2 }));
    const res = await serveStats({ store, key: "k", refresh });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { n: 2 });
    assert.equal(refresh.mock.callCount(), 1);
});

test("stats: returns 503 when the cache is empty and refresh fails", async () => {
    const store = fakeStore();
    const refresh = async () => { throw new Error("upstream down"); };
    const res = await serveStats({ store, key: "k", refresh });
    assert.equal(res.status, 503);
});
