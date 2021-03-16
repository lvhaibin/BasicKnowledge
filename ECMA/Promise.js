function resolvePromise(promise2,x,resolve,reject){
    //判断x是不是promise
    //规范中规定：我们允许别人乱写，这个代码可以实现我们的promise和别人的promise 进行交互
    if(promise2 === x){// 不能自己等待自己完成
        return reject(new TypeError('循环引用'));
    };
    // x是除了null以外的对象或者函数
    if(x != null && (typeof x === 'object' || typeof x === 'function')){
        let called; // 防止成功后调用失败
        try{ // 防止取then是出现异常  object.defineProperty
            let then = x.then; // 取x的then方法 {then:{}}
            if(typeof then === 'function') { // 如果then是函数就认为他是promise
                // call第一个参数是this，后面的是成功的回调和失败的回调
                then.call(x, y => {// 如果Y是promise就继续递归promise
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, r => { // 只要失败了就失败了
                    if(called) return;
                    called = true;
                    reject(r);
                });
            } else { // then是一个普通对象，就直接成功即可
                resolve(x);
            }
        } catch (e){
            if(called) return;
            called = true;
            reject(e)
        }
    } else { // x = 123 x就是一个普通值 作为下个then成功的参数
        resolve(x)
    }
}


class Promise1 {
    constructor(extucor) {
        this.promiseState = 'pending';
        this.promiseResult = null;
        this.reason = null;

        this.resolveCallbacks = [];

        this.rejectCallbacks = [];

        const resolve = (data) => {
            if (this.promiseState === 'pending') {
                this.promiseState = 'resolved';
                this.promiseResult = data;
                this.resolveCallbacks.forEach(fn => fn());
            }
        }

        const reject = (error) => {
            if (this.promiseState === 'pending') {
                this.promiseState = 'rejected';
                this.reason = error;
                this.rejectCallbacks.forEach(fn => fn());
            }
        }

        try {
            extucor(resolve, reject);
        } catch (error) {
            reject(error);
        }

    }

    then(onFuiFilled, onRejected) {
        onFuiFilled = typeof onFuiFilled === 'function' ? onFuiFilled : fn => fn;
        onRejected = typeof onRejected === 'function' ? onRejected : fn1 => fn1;
        let promise2;

        if (this.promiseState === 'pending') {
            promise2 = new Promise1((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onFuiFilled(this.promiseResult);
                            resolvePromise(promise2, x, resolve, reject);
                        }catch(e){
                            reject(e);
                        }
                    }, 0)
                });
                // 把失败的函数一个个存放到失败回调函数数组中
                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch(e){
                            reject(e)
                        }
                    }, 0)
                })
            })
        }
        if(this.promiseState === 'resolved'){
            promise2 = new Promise1((resolve,reject) => {
                setTimeout(() => {
                    try {
                        //成功的逻辑 失败的逻辑
                        let x = onFuiFilled(this.promiseResult);
                        //看x是不是promise 如果是promise取他的结果 作为promise2成功的的结果
                        //如果返回一个普通值，作为promise2成功的结果
                        //resolvePromise可以解析x和promise2之间的关系
                        //在resolvePromise中传入四个参数，第一个是返回的promise，第二个是返回的结果，第三个和第四个分别是resolve()和reject()的方法。
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e);
                    } 
                },0)
            }); 
       }

       if(this.promiseState === 'rejected'){
            promise2 = new Promise1((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        //在resolvePromise中传入四个参数，第一个是返回的promise，第二个是返回的结果，第三个和第四个分别是resolve()和reject()的方法。
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e);
                    }
                },0)

            });
       }
       return promise2;
    }
    catch (onRejected) {
        // catch 方法就是then方法没有成功的简写
        return this.then(null, onRejected);
    }
}


let p = new Promise1((reslove, reject) => {
    reject('error');
})

// console.log(p);

p.then(value => {
    throw Error('error1111')
}, error => {
    console.log('error ===>', error)
})




