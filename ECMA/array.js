const ary = [1,2,3];
const ary1 = [[4,5,6]];
const ary2 = [[[7,8,9]]];
// 数组降维
console.log(ary.concat(ary1, ary2).flat(Infinity));
console.log('--------分割线------');

const arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
function sortArr(arr) {
    let goNext = true;
    let entries = arr.entries();
    while(goNext) {
        let next = entries.next();
        if (!next.done) {
            goNext = true;
            next.value[1].sort((a,b) => { return a-b; })
        } else {
            goNext = false;
        }
    }
    return arr;
}

console.log(sortArr(arr));
