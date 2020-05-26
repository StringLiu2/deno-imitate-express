// 静态文件夹的方法返回的也是一个中间件
import { Context } from "./typing/index.ts";
import mimes from "../mime/index.ts";

// app.use(express.static('path'))
export default function staticFile(path: string) {
    if (!path) path = 'public'; // 默认文件夹的位置
    return async (ctx: Context, next: Function) => {
        try {
            // 因为我们没有给默认path的话， 他就会是 * 
            const ctxPath = ctx.path === '*' ? '' : ctx.path;
            // 拿到ctx.path ， 把ctx.url 前面部分通过ctx.path剪切
            const url = ctx.url.replace(new RegExp(`^${ctxPath}`), '');
            // 1.拿到文件的路径，绝对路径，就是通过path + url[剪切后的url]
            const absolutePath = await Deno.realPath(path + url);
            // 2.通过绝对路径，判断是不是文件 这里需要--allow-read
            const stat = await Deno.stat(absolutePath);
            if (stat.isFile) {
                // 3.如果是文件的话，我们返回文件的内容 并且设置响应的ContentType, 如果没有设置
                const content = await Deno.readTextFile(absolutePath);
                // 设置ContentType，需要拿到文件的mime, 通过文件后缀 拿到mime
                const extname = absolutePath.match(/.+(\..+)$/)?.[1]; // 就是拿到.json .html
                if (!extname) throw new Error();
                const mime = mimes[extname!]; // mime
                // 创建响应头
                const headers = new Headers();
                headers.set('Content-Type', `${mime};charset=utf-8`);
                ctx.respond({ body: content, headers });
            } else {
                next();
            }
        } catch (error) {
            console.log(error);
            next();
        }

    }
}