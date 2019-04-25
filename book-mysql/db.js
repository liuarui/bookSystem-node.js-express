/*将增删改查封装 */

const mysql = require('mysql');

exports.base = (sql,data,callback)=>{
    //连接数据库的配置
    const connection = mysql.createConnection({
        host: 'localhost', //数据库所在服务器的域名或ip地址
        user: 'root', //登陆数据库的账号
        password: '', //登陆数据库的密码
        database: 'book' //操作的表名
    });
    //执行连接数据库的方法
    connection.connect();
    
    //操作数据库(数据库操作为异步的)
    connection.query(sql,data,(error,results,fields)=>{
       if(error) throw error;
       callback(results);
    });
    //关闭数据库
    connection.end();
}