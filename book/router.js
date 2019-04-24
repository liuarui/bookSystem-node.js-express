//路由文件，用于分发路由
//引入文件
const express = require('express');

const router = express.Router();

const service = require('./service.js');

//路由处理
//渲染主页
router.get('/',service.showIndex);
//跳转到添加图书的页面
router.get('/toAddBook',service.toAddBook);
//添加图书功能
router.post('/addBook',service.addBook);
//跳转到修改图书的页面
router.get('toEditBook')
module.exports = router;