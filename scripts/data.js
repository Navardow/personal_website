
const path = "./test/projects.json";
export const meta = await fetch(path).then(res => res.json());


