import { denoExpress } from '../deno-express/index.ts';
import bodyParser from '../body-parser/index.ts';
import cors from '../cors/index.ts';

const app = denoExpress();
// 使用自定义的bodyParser
app.use(bodyParser());
// 使用自定义跨域中间件
app.use(cors());
app.use('/user',
    (ctx, next) => {
        console.log(' call use middleware 1');
        next();
    },
    (ctx, next) => {
        console.log(' call use middleware 2');
        next();
    });
app.get('/user/a', ctx => {
    // ctx.respond({ body: 'user a' })
    ctx.send({ a: 'user a' });
})
app.get('/', (ctx, next) => {
    // ctx.respond({ body: 'hello deno express' });
    console.log('send start');
    next();
    console.log('send end')
});
app.get('/', ctx => {
    ctx.respond({ body: 'hello deno express11' });
    ctx.respond({ body: 'hello deno express22' });
});
app.get('/user', ctx => {
    ctx.respond({ body: 'user deno express' });
});

app.post('/', ctx => {
    console.log(ctx.data);
    ctx.respond({ body: 'post deno express' });
});

app.listen({ port: 8000 }, () => {
    console.log('http://localhost:8000');
})