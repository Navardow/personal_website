import { test } from "node:test";
import assert from "node:assert/strict";
import { refreshLeet, LEET_KEY } from "../netlify/lib/leet.mjs";
import { fakeStore, respondWith, hangingFetch } from "./helpers.mjs";

const DATA = { allQuestionsCount: [], matchedUser: { username: "IskandarSubarashi" } };

test("LeetCode: caches the data on success", async () => {
    const store = fakeStore();
    const result = await refreshLeet({ store, fetchFn: respondWith({ data: DATA }) });
    assert.deepEqual(result, DATA);
    assert.deepEqual(JSON.parse(store.data[LEET_KEY]), DATA);
});

test("LeetCode: throws on a bad response", async () => {
    const store = fakeStore();
    await assert.rejects(refreshLeet({ store, fetchFn: respondWith("nope", 429) }), /429/);
    assert.equal(store.data[LEET_KEY], undefined);
});

test("LeetCode: throws on GraphQL errors", async () => {
    const store = fakeStore();
    const fetchFn = respondWith({ errors: [{ message: "rate limited" }] });
    await assert.rejects(refreshLeet({ store, fetchFn }), /rate limited/);
    assert.equal(store.data[LEET_KEY], undefined);
});

test("LeetCode: throws when the user isn't found", async () => {
    const store = fakeStore();
    const fetchFn = respondWith({ data: { matchedUser: null } });
    await assert.rejects(refreshLeet({ store, fetchFn }), /not found/);
});

test("LeetCode: gives up when LeetCode doesn't answer in time", async () => {
    const store = fakeStore();
    await assert.rejects(
        refreshLeet({ store, fetchFn: hangingFetch, timeoutMs: 20 }),
        { name: "TimeoutError" },
    );
});
