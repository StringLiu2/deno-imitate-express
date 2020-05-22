# deno-imitate-express

### deno入门到仿express简单实现 - typescript

### [什么是deno？http://www.ruanyifeng.com/blog/2020/01/deno-intro.html](http://www.ruanyifeng.com/blog/2020/01/deno-intro.html)

### [Deno官网入口 https://deno.land/](https://deno.land/)

#### 1.安装deno、安装vscode插件和运行简单的deno项目、标准库，相关社区等

#### 2.es2018的异步迭代器、es2020的 ? 运算符(可选链) 、 ?? 空值合并运算符 、 顶层await

#### 3.deno的命令和API[path、文件相关]进行讲解

#### 4.deno的实现express的功能的描述
#### 缺少: 
##### ```没有文件上传插件```
##### ```没有子路由系统模块，例如express.Router()```
##### 还有细节和不常用的功能

#### 5.express相关api的简单实现use，各种请求方法、get、post、delete、put等以及listen

#### 6.express的优化，重写respond，添加send方法(send方法默认设置了ContentType)

#### 7.添加body parser，对请求的data数据进行解析，解析出我们传递到后台的data参数

#### 8.添加cors — ```重写respond方法，设置跨域请求的响应请求头```

#### 9.express的封装的动态路由实现 — ```通过pathToRegexp库```

#### 10.静态文件夹  — ```设置静态文件夹，可以直接通过url访问, 通过文件后缀去mimes对象查找，然后设置Content-Type```

