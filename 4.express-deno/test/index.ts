import { denoExpress } from '../deno-express/index.ts';

const app = denoExpress();

app.use('/user',
    (ctx, next) => {
        console.log(' call use middleware 1');
        next();
    },
    (ctx, next) => {
        console.log(' call use middleware 2');
        next();
    });

app.get('/', (ctx, next) => {
    // ctx.respond({ body: 'hello deno express' });
    console.log('send start');
    next();
    console.log('send end')
});
app.get('/', ctx => {
    ctx.respond({ body: 'hello deno express' });
});
app.get('/user', ctx => {
    ctx.respond({ body: 'user deno express' });
});

app.post('/', ctx => {
    ctx.respond({ body: 'post deno express' });
});

app.listen({ port: 8000 }, () => {
    console.log('http://localhost:8000')
})