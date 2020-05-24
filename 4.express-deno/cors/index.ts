import { Response } from "https://deno.land/std@0.50.0/http/server.ts";
import { Context } from "../deno-express/index.ts";

// 跨域中间件
export default function cors() {
    return (ctx: Context, next: Function) => {
        // 来重写一个respond
        // 就是响应头只能在respond中设置
        const oldRespond = ctx.respond;
        ctx.respond = function (r: Response) {
            const headers = r.headers || new Headers();
            // 设置响应头，跨域相关的
            headers.set("Access-Control-Allow-Origin", "*");  // 允许所有路径跨域
            headers.set("Access-Control-Allow-Headers", "X-Requested-With");
            headers.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            headers.set("X-Powered-By", ' 3.2.1');
            oldRespond.call(ctx, { ...r, headers });
            return Promise.resolve();
        }
        next();
    }
}