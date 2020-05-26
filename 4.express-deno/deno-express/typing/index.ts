import { ServerRequest, HTTPOptions } from 'https://deno.land/std@0.50.0/http/server.ts';

// 更好的使用，我们继承这个类，并且添加一些我们需要的方法和参数
export interface Context extends ServerRequest {
    send: (body: any) => void; // 响应数据源的方法
    params: Record<string, string>; // 动态路由返回的params对象
    data: Record<string, string>;
    path: string; // path放到context上面
}

// 个个请求的回调函数，或者中间件的回调函数的类型
export interface Callback {
    (ctx: Context, next: Function): void; // express request ,response ,next
}
// 下面请求方法的类型、中间件的类型
export interface MethodFn {
    // 路径可以为空，默认 * 
    // 第二个参数到 n个参数都是回调函数
    (path: string | Callback, ...funs: Callback[]): void;
}
// listen 监听的数据类型
export interface Listen {
    (options: HTTPOptions, listenCallback?: Function): void;
}
export interface Route {
    path: string;
    callback: Callback;
    isMiddleware: boolean;
}
export interface Routers {
    [key: string]: Route[];
}
export interface App {
    // 存储次调用请求或者中间件的一个对象
    routers: Routers;
    get: MethodFn;
    post: MethodFn;
    put: MethodFn;
    delete: MethodFn;
    patch: MethodFn;
    use: MethodFn;
    listen: Listen;
    [key: string]: MethodFn | Listen | Routers;
}
