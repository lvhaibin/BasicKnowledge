let obj = {a: 10, b: 20};

Object.prototype[Symbol.iterator] = function*() {
    for(const item in this) {
        yield [item, this[item]];
    }
}

// 替代 toString 和 valueOf 方法
obj[Symbol.toPrimitive] = (hint) => {
    if(hint === 'string') {
        return 'hello';
    }
    if (hint === 'number') {
        return 99;
    }
    return null;
}

console.log('string', String(obj))
console.log('number', Number(obj))

for(const [key, v] of obj) {
    console.log('key ==',key, 'value ==', v);
}

// Symbol 装箱
let symbolObj = (function() { return this; }).call(Symbol('a'));

console.log('symbol 装箱操作', typeof symbolObj);
console.log('symbol 装箱操作', symbolObj instanceof Symbol);
console.log('symbol 装箱操作', symbolObj.constructor === Symbol);



