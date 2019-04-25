/*
业务逻辑处理文件
*/
//引入数据
const data = require('./data.json');
const path = require('path');
const fs = require('fs');
const db = require('./db.js')


//自动生成图书编号函数
// let maxBookCode = () => {
//     let arr = [];
//     data.forEach((item) => {
//         arr.push(item.id);
//     });
//     return Math.max.apply(null, arr);
// };
// 把内存数据写入文件通用方法
// let writeDataToFile = (res) => {
//     fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
//         if (err) {
//             res.send('server error');
//         }
//         //文件写入成功跳转到主页面
//         //使用redirect重定向到主页面
//         res.redirect('/');
//     });
// }


//主页面渲染
exports.showIndex = (req, res) => {
    let sql = "SELECT * FROM book";
    db.base(sql, null, (result) => {
        res.render('index', {
            list: result
        });
    });
};
//跳转到添加图书的页面
exports.toAddBook = (req, res) => {
    res.render('addBook', {})
};
//添加图书功能
exports.addBook = (req, res) => {
    let data = req.body;

    let sql = 'insert into book set ?'
    db.base(sql, data, (results) => {
        if (results.affectedRows === 1) {
            console.log("插入数据成功");
            res.redirect('/');
        } else {
            console.log("插入数据失败，请联系服务器管理员");
            res.redirect('/');
        }
    });
};
//跳转到修改图书的页面
exports.toEditBook = (req, res) => {
    let id = req.query.id;
    let sql = "SELECT * FROM book WHERE id=?"
    let data = [id];
    db.base(sql, data, (result) => {
        res.render('editBook', result[0]);
    });
};
//修改图书信息功能,更新数据
exports.editBook = (req, res) => {
    let info = req.body;
    let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
    let data = [info.name, info.author, info.category, info.description, info.id];
    //操作数据库
    db.base(sql, data, (results) => {
        if (results.affectedRows === 1) {
            console.log("更新数据成功");
            res.redirect('/');
        } else {
            console.log("更新数据失败，请联系服务器管理员");
            res.redirect('/');
        }
    });
};
//删除图书方法
exports.deleteBook = (req, res) => {
    let id = req.query.id;
    let sql = 'delete from book where id = ?';
    let data = [id];
//操作数据库
    db.base(sql,data,(results)=>{
    if(results.affectedRows === 1){
        console.log("删除数据成功")
        res.redirect('/');
    }
    else{
        console.log("删除数据失败，请联系服务器管理员");
        res.redirect('/');
    }
});	
};