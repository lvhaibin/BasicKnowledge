const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const p3 = Promise.resolve(3);

Promise.myAll = function(iterator) {
    const promises = Array.from(iterator);
    const length = promises.length;
    const result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((res) => {
                result[index] = res;
                if (++count === length) {
                    resolve(result);
                }
            }).catch((error) => {
                reject(error);
            })
        })
    })

}


Promise.myAll([p1, p2, p3]).then((res) =>{
    console.log(res);
}, (error) => {
    console.log(error)
})
