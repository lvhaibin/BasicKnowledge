function New(fn, ...args) {
    const obj = {};
    Object.setPrototypeOf(obj, fn.prototype);
    const result = fn.apply(obj, args);
    return result && typeof result === 'object' ? result : obj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayName = function() {
    console.log(this.name);
}


let p = new Person('小明', 10);

let p1 = New(Person, '小丽', 11);

p.sayName();

p1.sayName();

