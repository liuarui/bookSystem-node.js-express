/*
    查询数据库基本步骤
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

let sql = 'select * from book where id = ?';
let data = [3];
//操作数据库
connection.query(sql,data,(error,results,fields)=>{
    if(error) throw error;
    if(results[0]){
        
        console.log(results[0].name);
        //console.log(results);
        console.log("查询成功，结果如上")
    }
    else{
        console.log("未查询到结果")
    }
});

//关闭数据库
connection.end();