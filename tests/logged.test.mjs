import { test } from "node:test";
import assert from "node:assert/strict";
import { logged } from "../netlify/lib/logged.mjs";

test("logged: returns the job's result and logs success", async (t) => {
    const log = t.mock.method(console, "log", () => {});
    const result = await logged("job", async () => ({ ok: true }));
    assert.deepEqual(result, { ok: true });
    assert.match(log.mock.calls.at(-1).arguments[0], /job: done in \d+ms/);
});

test("logged: logs the error and rethrows it (no silent failures)", async (t) => {
    t.mock.method(console, "log", () => {});
    const error = t.mock.method(console, "error", () => {});
    await assert.rejects(logged("job", async () => { throw new Error("boom"); }), /boom/);
    assert.equal(error.mock.callCount(), 1);
});
