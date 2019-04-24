/*
业务逻辑处理文件
*/
//引入数据
const data = require('./data.json')
const path =require('path');
const fs = require('fs');

//自动生成图书编号
let maxBookCode = ()=>{
    let arr= [];
    data.forEach((item)=>{
        arr.push(item.id);
    });
    return Math.max.apply(null,arr);
}
//直接把主页面渲染暴露出去
exports.showIndex = (req, res) => {
    res.render('index', {
        list: data
    });
}
//跳转到添加图书的页面
exports.toAddBook = (req, res) => {
    res.render('addBook',{})
};
//添加图书功能
exports.addBook = (req,res)=>{
    let info = req.body;
    let book = {};
    for(let key in info){
        book[key] = info[key];
    }
    book.id = maxBookCode()+1;
    data.push(book);
    //把接收到的图书信息写入到data.json中
    fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data),(err)=>{
        if(err){
            res.send('server error');
        }
        //文件写入成功跳转到主页面
        //使用redirect重定向到主页面
        res.redirect('/')
    });
}