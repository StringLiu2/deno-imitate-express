// const file = await Deno.create('./test.txt');

// Deno.createSync('./test2.txt');

// console.log(Deno.execPath()); // 返回运行的deno的所在运行位置 /usr/local/bin/deno

// // 创建一个文件夹
// await Deno.mkdir("test", { recursive: true }); // mkdir test


// const file = await Deno.open('test.txt', { 
//     read: true, 
//     write: true,
//     // create: true, // 没有的话创建文件
//     append: true, // 追加
//  });  

// // const unit = new TextEncoder().encode('hello world');
// // await file.write(unit); // Uint8Array八位无符号整数值
// // // 等到文件写入之后，关闭文件
// // Deno.close(file.rid);
// // const unit = new Uint8Array(100);
// // await Deno.read(file.rid, unit);
// const unit = await Deno.readAll(file);
// console.log(new TextDecoder().decode(unit)); // Uint8Array转换成字符串

// Deno.close(file.rid);

// readDir 读取文件文件夹
// for await (const dirEntry of Deno.readDir("./")) {
//     console.log(dirEntry.name);
// }

// // readFile 
// const unit = await Deno.readFile('./test.txt');

// console.log(new TextDecoder().decode(unit)); // hello worldhello world

// const str = await Deno.readTextFile('./test.txt');
// console.log(str);

// const path = await Deno.realPath('./');

// // 返回一个绝对路径
// console.log(path); // /Users/tim/Desktop/Mack Liu/WebMaterial/deno/deno-imitate-express/2.deno-api
// 删除文件或者文件夹
// await Deno.remove('./test', { recursive: true });

// 重命名文件或者文件夹

// await Deno.rename('./test2.txt', './test.txt');
// await Deno.create('./test2'); // 注意：create只能创建文件, 通过Deno.mkdir创建文件夹
// await Deno.rename('./test2', './test');

// 执行终端命令的api
// Deno.run({
//     cmd: ['mkdir', './test']
// });

// const stat = await Deno.stat('./test');
// console.log(stat.isFile) // 是不是文件
// console.log(stat.isDirectory); // 是不是文件夹

// // 文件写入
// const file = await Deno.open('./test.txt', { write: true, read: true });
const unit = new TextEncoder().encode('hello');
// await Deno.write(file.rid, unit);

// Deno.close(file.rid); // 关闭对应的进程

// await Deno.writeFile('./test.txt', unit, { create: true, append: true });

await Deno.writeTextFile('./test.txt', '字符串');