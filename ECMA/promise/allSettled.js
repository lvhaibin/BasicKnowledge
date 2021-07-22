const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);

const formatResult = (success, value) => {
    return success ? { status: 'fulfilled', value } : { status: 'rejected', reason: value };
}



Promise.allSettled([p1, p2]).then((res) => {
    console.log(res);
})

