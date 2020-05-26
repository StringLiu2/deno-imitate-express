import { App, Routers, Callback } from "./typing/index.ts";
import listen from "./listen.ts";
import methodFn from "./methodFn.ts";
import staticFile from "./static.ts";

const methods = ['get', 'post', 'put', 'patch', 'delete'];

// 执行返回一个app对象，里面包含了get、post、put、delete、patch、use、listen等方法
export function denoExpress() {
    const constr: App = {
        routers: {} as Routers,
    } as App;
    // 绑定this指向constr
    constr.listen = listen.bind(constr);
    constr.use = use.bind(constr);
    methods.forEach(method => {
        // 请求类型method
        constr[method] = methodFn.call(constr, method);
    });
    return constr;
}

function use(this: App, path: string | Callback, ...funs: Callback[]) {
    // 做的是对path，funs进行存储 
    // 由于中间件是各种请求类型都能执行到的，只要path相同
    for (const type of methods) {
        // this[type]();
        // 先留着，实现get，post那些请求
        methodFn.call(this, type, true)(path, ...funs);
    }
}
denoExpress.static = staticFile;