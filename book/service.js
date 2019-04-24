/*
业务逻辑处理文件
*/
//引入数据
const data = require('./data.json');
const path = require('path');
const fs = require('fs');

//自动生成图书编号函数
let maxBookCode = () => {
    let arr = [];
    data.forEach((item) => {
        arr.push(item.id);
    });
    return Math.max.apply(null, arr);
};
// 把内存数据写入文件通用方法
let writeDataToFile = (res) => {
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
        if (err) {
            res.send('server error');
        }
        //文件写入成功跳转到主页面
        //使用redirect重定向到主页面
        res.redirect('/');
    });
}


//主页面渲染
exports.showIndex = (req, res) => {
    res.render('index', {
        list: data
    });
};
//跳转到添加图书的页面
exports.toAddBook = (req, res) => {
    res.render('addBook', {})
};
//添加图书功能
exports.addBook = (req, res) => {
    let info = req.body;
    let book = {};
    for (let key in info) {
        book[key] = info[key];
    }
    book.id = maxBookCode() + 1;
    data.push(book);
    //把接收到的图书信息写入到data.json中
    writeDataToFile(res);
};
//跳转到修改图书的页面
exports.toEditBook = (req, res) => {
    let id = req.query.id;
    let book = {};
    data.forEach((item) => {
        if (id == item.id) {
            book = item;
            return;
        }
    });
    res.render('editBook', book);
};
//修改图书信息功能,更新数据
exports.editBook = (req, res) => {
    let info = req.body;
    data.forEach((item) => {
        if (info.id == item.id) {
            for (let key in info) {
                item[key] = info[key];
            }
            return;
        }
    })
    //把接收到的图书信息写入到data.json中
    writeDataToFile(res);
};
//删除图书方法
exports.deleteBook = (req, res) => {
    let id = req.query.id;
    data.forEach((item, index) => {
        if (id == item.id) {
            // 删除数组的一项数据
            data.splice(index, 1);
        }
        return;
    });
    // 把内存中的数据写入文件
    writeDataToFile(res);
};