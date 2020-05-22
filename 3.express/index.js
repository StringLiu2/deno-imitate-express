const express = require('express');

const app = express();

// app.use(cors()); // 跨域

// app.use(bodyParser()); // 实现

// app.use(express.static()); // 静态文件夹

app.use('/user', (request, response, next) => {
  console.log('use express middleware');
  next();
}); // 中间件

app.get('/', (request, response, next) => {
  next();
});

app.get('/', (request, response) => {
  response.send('hello express');
});

app.post('/', (request, response) => {
  response.send('hello express post');
});

app.put('/', (request, response) => {
  response.send('hello express put');
});
app.patch('/', (request, response) => {
  response.send('hello express patch');
});
app.delete('/', (request, response) => {
  response.send('hello express delete');
});
// 动态路由
app.delete('/:id', (request, response) => {
  console.log(request.params); // { id: '111' }
  response.send('hello express delete');
});
// 监听
app.listen(8000, () => {
  console.log('http://localhost:8000');
});
