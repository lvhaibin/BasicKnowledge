const p1 = Promise.reject(1);
const p2 = Promise.reject(2);
const p3 = Promise.reject(3);

Promise.myAny = (iterator) => {
    const promises = Array.from(iterator);
    const length = promises.length;
    const result = [];
    let count = 0;

    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(res => {
                resolve(res);
            }).catch(err => {
                result[index] = err;
                if (++count === length) {
                    reject(result);
                }
            })
        })
    })

}

Promise.myAny([p1, p2, p3]).then(res => {
    console.log(res)
}).catch(err => {
    console.log('err', err)
})
