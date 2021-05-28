// object 部署iterator 接口
Object.prototype[Symbol.iterator] = function*() {
    for(const item in this) {
        yield [item, this[item]];
    }
}

let obj = {a: 10, b: 20, c: 30};

for(const [key, v] of obj) {
    console.log('key ==',key, 'value ==', v);
}


