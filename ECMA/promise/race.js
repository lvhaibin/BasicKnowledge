const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const p3 = Promise.reject(3);

Promise.myRace = (iterator) => {
    const promises = Array.from(iterator);
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            Promise.resolve(promise).then(resolve, reject)
        }
    })
}

Promise.myRace([p1, p2, p3]).then(res => {
    console.log(res)
}).catch(err => {
    console.log('err', err)
})
