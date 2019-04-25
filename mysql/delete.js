/*
    删除数据库基本步骤
*/
//引包
const mysql = require('mysql');
//连接数据库的配置
const connection = mysql.createConnection({
    host: 'localhost', //数据库所在服务器的域名或ip地址
    user: 'root', //登陆数据库的账号
    password: '', //登陆数据库的密码
    database: 'book' //操作的表名
});
//执行连接数据库的方法
connection.connect();

let sql = 'delete from book where id = ?';
let data = [2];
//操作数据库
connection.query(sql,data,(error,results,fields)=>{
    if(error) throw error;
    if(results.affectedRows === 1){
        console.log("删除数据成功")
    }
    else{
        console.log("删除数据失败，请联系服务器管理员");
    }
});

//关闭数据库
connection.end();