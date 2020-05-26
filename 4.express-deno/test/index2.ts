import { denoExpress } from '../deno-express/index.ts';

const app = denoExpress();

app.get('/user/:id', ctx => {
    // { id: 'xx' }
    ctx.send(ctx.params);
});

app.get('/user/:name/:id', ctx => {
    // { id: 'xx', name: 'xxx' }
    ctx.send(ctx.params);
});

app.listen({ port: 8000 }, () => {
    console.log('http://localhost:8000');
})