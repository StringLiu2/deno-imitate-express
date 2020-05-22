import { HTTPOptions, listenAndServe } from "https://deno.land/std@0.50.0/http/server.ts";
import { App, Routers, Callback, Context } from "./typing/index.ts";

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
        methodFn.call(this, type)(path, ...funs);
    }
}

function listen(this: App, options: HTTPOptions, listenCallback?: Function) {
    listenCallback?.(); // 执行传递的回调
    listenAndServe(options, ctx => {
        const type = ctx.method.toLowerCase(); // 获取请求类型，小写
        const routes = this.routers[type]; // 对应请求类型的Route数组
        // 后面就是循环判断里面有没有对应的请求path url
        if (!routes) { // 路由数组没有的话，表示没有这个请求类型的回调
            ctx.respond({ status: 404, body: 'Not Found！' });
            return;
        }
        deep(0);
        // 找到，递归来执行
        function deep(i: number) {
            // 执行到后面了
            if (routes.length <= i) {
                ctx.respond({ status: 404, body: 'Not Found！' });
                return;
            }
            const route = routes[i];
            // route.path === "*" 就是什么样的请求路径都调用
            if (route.path === ctx.url || route.path === "*") {
                route.callback(ctx as Context, () => deep(++i));
            } else {
                deep(++i);
            }
        }
    });
}

function methodFn(this: App, type: string) {
    return (path: string | Callback, ...funs: Callback[]) => {
        this.routers[type] || (this.routers[type] = []);
        if (typeof path === 'string') { // 有没有传递请求的路径
            if (funs.length === 0) funs = [(ctx, next) => next()];
        } else {
            // 没有传递请求路径，我们要给默认的
            funs.unshift(path);
            path = "*";
        }
        funs.forEach(fun => {
            this.routers[type].push({
                path: path as string,
                callback: fun
            });
        });
    }
}