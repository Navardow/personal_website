
const path = "/data/meta.json";
export const meta = await fetch(path).then(res => res?.json());


