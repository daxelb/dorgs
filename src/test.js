import Random from './Random.js';

const rand = new Random();

function shuffleWeighted(d) {
    let res = [];

    while (Object.keys(d).length > 0) {
        const arr = Object.keys(d);
        const weights = Object.values(d);
        const key = rand.weighted(arr, weights);
        res.push(key);
        delete d[key];
    }
    return res;
}

console.log(shuffleWeighted({ a: 1, b: 2, c: 3, d: 50 }));
