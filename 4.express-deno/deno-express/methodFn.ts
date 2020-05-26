import { App, Callback } from "./typing/index.ts";

export default function methodFn(this: App, type: string, isMiddleware: boolean = false) {
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
                callback: fun,
                isMiddleware
            });
        });
    }
}
