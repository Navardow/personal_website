import { parse as convert } from 'https://cdn.jsdelivr.net/npm/marked/+esm';
import { meta, settled } from "./data.js";

const cache = {}
let cache_size = 0, settled_size;

settled.then((r) => {
    settled_size = r.length;
    r.forEach(item => {
        item.text().then(t => {
            cache_size++;
            cache[item.url] = convert(t);
        })
    })
})

let router = {
    initialized(c_size, s_size) {
        return c_size === s_size;
    },

    valid_path(path) {
        return !cache[path];
    },
}

router.initialized()










