// // 异步迭代器
// const asyncIterator = {
//     // 异步迭代器
//     [Symbol.asyncIterator]: () => {
//         const items = [`j`, `u`, `s`, `t`, `j`, `a`, `v`, `a`, `c`];
//         return {
//             next: () => {
//                 interface Next {
//                     done: boolean; value: string | undefined;
//                 };
//                 return new Promise<Next>((resolve, _) => {
//                     setTimeout(() => {
//                         resolve({
//                             done: items.length === 0,
//                             value: items.shift()
//                         });
//                     }, 1000);
//                 })
//             }
//         }
//     }
// }
// // 同步迭代器
// const syncIterator = {
//     [Symbol.iterator]: () => {
//         const items = [`j`, `u`, `s`, `t`, `j`, `a`, `v`, `a`, `c`];
//         return {
//             next: () => ({
//                 done: items.length === 0,
//                 value: items.shift()
//             })
//         }
//     }
// }
// // for await of
// // 异步迭代器的迭代 每次执行都会因为定时器暂停1秒
// for await (const item of asyncIterator) {
//     console.log(item);
// }

// // 同步迭代器的迭代
// for (const item of syncIterator) {
//     console.log(item);
// }

// // ? 可选链

// const obj: any = {
//     user: {
//         name: 'liu'
//     }
// }
// const name = obj && obj.user && obj.user.name;

// const name1 = obj?.user?.name;
// console.log(name, name1);

// // 数组 方法进行使用

// // 数组
// const arr = [1,2,3];
// console.log(arr?.[2], arr && arr[2]);

// // 方法的使用
// const obj2: any = {
//     fn() {
//         console.log('call fn');
//     }
// }
// obj2?.fn?.();

// obj2 && obj2.fn && obj2.fn();

// || 短路或  ?? 空值合并运算符
// || => 只要前面是null、undefined、false、0、'' 都会执行后面的代码
// ?? => 只要前面是null、undefined才会执行后面的 *空值

const obj3 = {
    name: null
}
console.log(obj3.name || 'liu'); // 'liu'

console.log(obj3.name ?? 'liu'); // ''

// ?? 和 ?
console.log(obj3?.name ?? 'liu'); // 'liu'

function promise() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('test');
        }, 1000)
    })
}

// async await 
async function fn() {
    const val = await promise();
    console.log(' async await ', val);
}
fn();
// 顶级await
const val = await promise();
console.log('顶级await', val);
const val2 = await promise();

console.log('顶级await2', val2);
