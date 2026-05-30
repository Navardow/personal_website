
const path = "./test/projects.json";
export const meta = await fetch(path).then(res => res.json());

const promises = meta.projects.map(p => fetch(p.file));
export const settled = Promise.all(promises);

