// Rethrow so Netlify marks the run as failed.
export async function logged(name, job) {
    const start = Date.now();
    console.log(`${name}: starting`);
    try {
        const result = await job();
        const bytes = JSON.stringify(result).length;
        console.log(`${name}: done in ${Date.now() - start}ms, ${bytes} bytes`);
        return result;
    } catch (error) {
        console.error(`${name}: failed in ${Date.now() - start}ms`, error);
        throw error;
    }
}
