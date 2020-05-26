import { App, Callback } from "./typing/index.ts";

export default function methodFn(this: App, type: string, isMiddleware: boolean = false) {
    return (path: string | Callback, ...funs: Callback[]) => {
        this.routers[type] || (this.routers[type] = []);
        if (typeof path === 'string') { // 有没有传递请求的路径
            if (funs.length === 0) funs = [(ctx, next) => next()];
            // 处理一下，防止没有/开头，后面没办法匹配
            if(path[0] !== '/') path = '/' + path;
        } else {
            // 没有传递请求路径，我们要给默认的
            funs.unshift(path);
            path = "*";
        }
        funs.forEach(fun => {
            this.routers[type].push({
                path: path as string,
                callback: fun,
                isMiddleware
            });
        });
    }
}
