import { HTTPOptions, listenAndServe, Response } from "https://deno.land/std@0.50.0/http/server.ts";
import { Context, App } from "./typing/index.ts";
import addSend from "./addSend.ts";
import { pathToRegexp, Key } from '../pathToRegexp/index.ts';

export default function listen(this: App, options: HTTPOptions, listenCallback?: Function) {
    listenCallback?.(); // 执行传递的回调
    listenAndServe(options, ctx => {
        const type = ctx.method.toLowerCase(); // 获取请求类型，小写
        const routes = this.routers[type]; // 对应请求类型的Route数组
        // 定义一个变量，用来表示是否调用了respond
        let callRespond = false;
        // 重写respond
        const oldRespond = ctx.respond;
        ctx.respond = function (res: Response) {
            if (!callRespond) {
                callRespond = true; // 表示已经调用了
                oldRespond.call(ctx, res);
            } else {
                // 不处理了， 默认的express是抛出错误的
            }
            return Promise.resolve();
        }
        // 添加一个send方法
        addSend(ctx as Context);
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
            if (
                route.path === ctx.url || route.path === "*" ||
                // 给route设置一个变量，如果为true就是中间件
                // 这时候我们需要判断url是否是以route.path开头的 indexOf 结果为0
                (route.isMiddleware && ctx.url.indexOf(route.path) === 0)
            ) {
                route.callback(ctx as Context, () => deep(++i));
            } else {
                // 动态路由的匹配
                const keys: Key[] = [];
                const regexp = pathToRegexp(route.path, keys);
                const match = ctx.url.match(regexp);
                // /user/:id
                // /user/111
                // match : ['/user/111', '111']
                if (match) {
                    // 匹配到了，表示当前访问了动态路由
                    const params: Record<string, string> = {};
                    keys.forEach((key, index) => {
                        params[key.name] = match[index + 1];
                    });
                    (ctx as Context).params = params;
                    route.callback(ctx as Context, () => deep(++i));
                } else {
                    deep(++i);
                }
            }

        }
    });
}