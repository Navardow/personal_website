import { test } from "node:test";
import assert from "node:assert/strict";
import { refreshUva, UVA_KEY } from "../netlify/lib/uva.mjs";
import { fakeStore, respondWith, hangingFetch } from "./helpers.mjs";

// uHunt rows look like [submissionId, problemId, verdict, ...]; verdict 90 = accepted
const SUBS = { subs: [[1, 100, 90], [2, 100, 70], [3, 200, 90]] };

test("UVa: caches cleaned stats on success", async () => {
    const store = fakeStore();
    const result = await refreshUva({ store, fetchFn: respondWith(SUBS) });
    assert.equal(result.accepted.length, 2);
    assert.deepEqual(result.attempted_ids, [100, 200]);
    assert.deepEqual(JSON.parse(store.data[UVA_KEY]), result);
});

test("UVa: throws on a bad response and leaves the cache alone", async () => {
    const store = fakeStore();
    await assert.rejects(refreshUva({ store, fetchFn: respondWith("down", 503) }), /503/);
    assert.equal(store.data[UVA_KEY], undefined);
});

test("UVa: gives up when uHunt doesn't answer in time", async () => {
    const store = fakeStore();
    await assert.rejects(
        refreshUva({ store, fetchFn: hangingFetch, timeoutMs: 20 }),
        { name: "TimeoutError" },
    );
    assert.equal(store.data[UVA_KEY], undefined);
});
