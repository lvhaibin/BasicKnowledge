const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);

const formatResult = (success, value) => {
    return success ? { status: 'fulfilled', value } : { status: 'rejected', reason: value };
}


Promise.myAllSettled = (iterator) => {
    const promises = Array.from(iterator);
    const length = promises.length;
    const result = [];
    let count = 0;
    return new Promise((resolve) => {
        Array.from(iterator).forEach((item, index) => {
            Promise.resolve(item).then((res) => {
                result[index] = formatResult(true, res);
                if (++count === length) {
                    resolve(result);
                }
            }).catch((error) => {
                result[index] = formatResult(false, error);
                if (++count === length) {
                    resolve(result);
                }
            })
        })
    })
}


Promise.myAllSettled([p1, p2]).then((res) => {
    console.log(res);
})

