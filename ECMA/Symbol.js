let obj = {a: 10, b: 20};

Object.prototype[Symbol.iterator] = function*() {
    for(const item in this) {
        yield [item, this[item]];
    }
}

for(const [key, v] of obj) {
    console.log('key ==',key, 'value ==', v);
}

console.log('------分割线-------\n');

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
console.log('------分割线-------\n');


// Symbol 装箱
let symbolObj = (function() { return this; }).call(Symbol('a'));

console.log('symbol 装箱操作', typeof symbolObj);
console.log('symbol 装箱操作', symbolObj instanceof Symbol);
console.log('symbol 装箱操作', symbolObj.constructor === Symbol);
console.log('------分割线-------\n');

// 修改intanceof
class MyArray {
    static [Symbol.hasInstance](instance) {
        return Array.isArray(instance);
    }
}
console.log('修改intanceof', [] instanceof MyArray);
console.log('------分割线-------\n');

const ary = [1,2,3];
const ary1 = [4,5,6];

console.log(ary.concat(ary1));

ary1[Symbol.isConcatSpreadable] = false;

console.log(ary.concat(ary1));



