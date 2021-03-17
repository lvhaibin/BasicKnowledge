
const isObject = (obj) => {
    return obj === null ? false : typeof obj === 'object';
}

const cloneDeep = obj => {
    if (!isObject(obj)) {
        return obj;
    }
    const target = Array.isArray(obj) ? [] : {};

    for(let key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            if (isObject(obj[key])) {
                target[key] = cloneDeep(obj[key]);
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

const obj1 = cloneDeep(obj);

console.log(obj1);


