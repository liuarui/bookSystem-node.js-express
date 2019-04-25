//图书管理系统的入口文件
const path = require('path');
//单独配置路由包
const router = require('./router');
const express = require('express');
const bodyParser = require('body-parser');
const template = require('art-template');

const app = express();
//提供静态资源服务
app.use('/www',express.static('public'));
//设置模板引擎路径 __dirname指向当前工作路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'art');
//调用express-art-template包来让express兼容art-template
app.engine('art', require('express-art-template'));

//执行业务逻辑
//1.使用body-parser包处理请求参数
app.use(bodyParser.urlencoded({extended: false}));
//处理json文件命令
app.use(bodyParser.json());
//2.配置路由,
app.use(router);
//3.监听端口
app.listen(3000, () => {
    console.log("图书管理系统运行中")
})