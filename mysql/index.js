/*
    操作数据库基本步骤
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
//操作数据库
connection.query('select count(*) as total from book',(error,results,fields)=>{
    if(error) throw error;
    console.log('表book中共有',results[0].total+'条数据');
});

//关闭数据库
connection.end();