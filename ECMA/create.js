Object.myCreate = function (proto) {
    const fn = function Fn() {}
    if (proto === null) {
        fn.prototype.constructor = null;
    }
    fn.prototype = proto;
    return new fn();
}

console.log(Object.myCreate(null))
console.log(Object.create(null))
