/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require('../db/index.js')


// 新增约稿的处理函数
exports.release = (req, res) => {
    const userinfo = req.body;

    const sql1 = `select * from book where writerid=?`
    
    db.query(sql1, [userinfo.writerid], function (err, results) {
      // 执行 SQL 语句失败
      if (err) {
        return res.cc(err)
      }
      // 用户名被占用
      console.log(results);
      for(var i = 0; i< results.length;i++){
        if(results[i].name == userinfo.name){
          return res.cc('书稿已上传')
        }else{
        }
      }
      // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
       
        const sql =  `insert into book set ?` 
        db.query(sql, userinfo, function (err1, results1) {
                // 执行 SQL 语句失败
                console.log('object1'); 
                console.log(userinfo);
                if (err1) return res.cc(err1)
                // SQL 语句执行成功，但影响行数不为 1
                if (results1.affectedRows !== 1) {   
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                return res.cc('注册用户失败，请稍后再试！')
                }
                // 注册成功
                // res.send({ status: 0, message: '注册成功！' })
                return res.cc('发布成功！',0)
                    
                })
    })
  }


  
  // 查看
  exports.see = (req, res) => {
    const sql = `select * from book where del = 0 and state = 0`
    db.query(sql,function(err, results){
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取约稿信息成功！',
            data: results,
        })
    })
  }
  exports.seestate = (req, res) => {
    const sql = `select * from book where del = 0 and stateid = ? and state = 0`
    db.query(sql,[req.body.stateid],function(err, results){
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取约稿信息成功！',
            data: results,
        })
    })
  }

  exports.seewriter = (req, res) => {
    const sql = `select * from book where del = 0 and ?`
    console.log(req.body);
    db.query(sql,{writerid:req.body.writerid},function(err, results){
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取约稿信息成功！',
            data: results,
        })
    })
  }
  exports.seeid = (req, res) => {
    const sql = `select * from book where del = 0 and ? and stateid = 0`
    console.log(req.body);
    db.query(sql,{id:req.body.id},function(err, results){
        if(err) return res.cc(err)
        res.send({ 
            status: 0,
            message: '获取书籍信息成功！',
            data: results,
        })
    })
  }
//修改
  exports.insert = (req,res)=>{
    const sql = `update book set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
      
        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
      })
      
  }
  