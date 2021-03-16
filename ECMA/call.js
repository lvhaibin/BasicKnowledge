Function.prototype.myCall = function(context, ...args) {
    context.func = this;
    const result = context.func(...args);
    delete context.func;
    return result;
}

let obj = {
    a: 10
}

function fn(b, c, d) {
    return this.a + b + c + d;
}

const test1 = fn.myCall(obj, 1, 2, 3);

console.log(test1);
