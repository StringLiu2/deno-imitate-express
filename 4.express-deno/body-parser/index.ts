import { Context } from "../deno-express/index.ts";

export default function bodyParser() {
    // 返回一个中间件
    return async (ctx: Context, next: Function) => {
        const buf = new Uint8Array(2048); // 2048位
        // 每次写入buf，返回如果不是null，表示body这个流中还有数据
        while ((await ctx.body.read(buf)) !== null) { }

        // const bodyStr = new TextDecoder().decode(buf);
        const bodyStr = Uint8ArrayToString(buf);
        // 把bodyStr转换成对象
        const data = StringToData(bodyStr);
        // 默认body是响应的数据的方法
        ctx.data = data;
        next();
    }
}
// 返回 { user:'xxx' , id: 'xxx' }
function StringToData(bodyStr: string): Record<string, string> {
    const data: Record<string, string> = {};
    try {
        // user=xxx&id=xxx
        const bodyStrArr = bodyStr.split('&');
        // [user=xxx, id=xxx]
        for (let item of bodyStrArr) {
            // 对拿到的字符串继续剪切
            const itemArr = item.split('=');
            data[itemArr[0]] = itemArr[1];
        }
    } catch (error) {
        return {};
    }
    return data;
}

function Uint8ArrayToString(buf: Uint8Array) {
    let dataString: string = "";
    try {
        for (let i = 0; i < buf.length; i++) {
            if (buf[i]) { // 为0的话就是没有的
                dataString += String.fromCharCode(buf[i]);
            }
        }
    } catch (error) {
        return "";
    }
    return decodeURIComponent(dataString); // 一些中文转化成字符
}