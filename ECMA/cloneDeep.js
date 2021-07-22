
const isObject = (obj) => {
    return obj === null ? false : typeof obj === 'object';
}

const cloneDeep = (obj, hash = new WeakMap()) => {
    if (!isObject(obj)) {
        return obj;
    }

    if (hash.has(obj)) {
        return hash.get(obj);
    }

    const target = Array.isArray(obj) ? [] : {};
    hash.set(obj, target);
    for(let key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            if (isObject(obj[key])) {
                target[key] = cloneDeep(obj[key], hash);
            } else {
                target[key] = obj[key];
            }
        }
    }

    return target;
}

const obj = { 
  name: 'muyiy', 
  book: { title: 'You Don\'t Know JS', price: '45' },
  a1: undefined,
  a2: null,
  a3: 123
}
obj.a4 = obj;

const obj1 = cloneDeep(obj);

console.log(obj1);


