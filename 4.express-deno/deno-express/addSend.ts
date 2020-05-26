import { Context } from "./typing/index.ts";

export default function addSend(ctx: Context) {
    ctx.send = function (content: any) {
        // ContentType
        const headers = new Headers();
        headers.set('Content-Type', 'application/json;charset=utf-8');
        if (typeof content === 'string') {
            ctx.respond({ body: content, headers });
        } else if (typeof content === 'object') {
            ctx.respond({ body: JSON.stringify(content), headers });
        } else if (typeof content === 'number') {
            ctx.respond({ body: content.toString(), headers });
        } else {
            // ... 不做处理
            ctx.respond({ body: content });
        }
    }
}