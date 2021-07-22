class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayName() {
        return this.name;
    }
}

class Student extends Person {
    constructor(name, age) {
        super(name, age)
    }

    studentSay() {
        console.log(super.sayName())
    }
}

let st = new Student('xjf', 20);

console.log(st.studentSay());

