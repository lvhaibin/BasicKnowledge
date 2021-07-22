// 0, 1, 1, 2, 3, 5

function fibonacci(count) {
    if (count <= 1) {
        return 1;
    }
    const a1= fibonacci(count - 1);
    const a2 = fibonacci(count - 2);
    return a1 + a2;
}

const res = fibonacci(5);

console.log(res);
