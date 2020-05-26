import { denoExpress } from '../deno-express/index.ts';

const app = denoExpress();
// /public/public/index.html
app.use('public',denoExpress.static('public'))

app.listen({ port: 8000 }, () => {
    console.log('http://localhost:8000');
})