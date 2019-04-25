/*
    前后端协作联同数据库练习
*/
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

//指定路由
app.post('/check',(req,res)=>{
    console.log("有人试图登陆");
    let param = req.body;
    // console.log(param)
    let sql = 'SELECT COUNT(*) AS TOTAL FROM USER WHERE username=? and password=?';
    let data = [param.username,param.password];

    db.base(sql,data,(result)=>{
        if(result[0].TOTAL === 1){
            res.send('登陆成功')
            console.log("该用户登陆你已经成功引起了我的注意");
        }else{
            // console.log(result[0])
            res.send('用户名或密码错误')
            console.log("该用户登陆失败");
        }
    })


});
app.get('/register',(req,res)=>{
    console.log("有人试图注册");
    let param = req.query;
    console.log(param);
})
app.listen(3000,()=>{
    console.log('服务器启动成功');
});
