/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require('../db/index.js')


// 新增约稿的处理函数
exports.release = (req, res) => {
    const userinfo = req.body;

    const sql = `select * from wait where writerid=? and invitid = ?`
    db.query(sql, [userinfo.writerid,userinfo.invitid], function (err, results) {
      // 执行 SQL 语句失败
      if (err) {
        // return res.send({ status: 1, message: err.message })
        return res.cc(err)
      }
      // 用户名被占用
      if (results.length > 0) {
        // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
        return res.cc('已确定投稿')

      }
      // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串

      const sql =  `insert into wait set ?` 
      db.query(sql, { writerid: userinfo.writerid,
                      invitid:userinfo.invitid,
        }, function (err, results) {
              // 执行 SQL 语句失败
              if (err) return res.cc(err)
  
              // SQL 语句执行成功，但影响行数不为 1
              if (results.affectedRows !== 1) {   
              // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
              return res.cc('注册用户失败，请稍后再试！')
              
          }
          // 注册成功
          // res.send({ status: 0, message: '注册成功！' })
          return res.cc('发布成功！',1)
              
          })

    })


  }
  
  // 查看
  exports.see = (req, res) => {
    const sql = `select * from wait where writerid = ? and pass = 0`
    console.log(req.body);
    db.query(sql,[req.body.writerid],function(err, results){
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取待约稿信息成功！',
            data: results,
        })
    })
  }
  exports.seeinviit = (req, res) => {
    const sql = `select * from wait where invitid = ? and pass = 1`
    console.log(req.body);
    db.query(sql,[req.body.invitid],function(err, results){
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取待约稿信息成功！',
            data: results,
        })
    })
  }
  exports.seeinviit = (req, res) => {
    const sql = `select * from wait where invitid = ? and pass = 1`
    console.log(req.body);
    db.query(sql,[req.body.invitid],function(err, results){
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取待约稿信息成功！',
            data: results,
        })
    })
  }
//修改
  exports.insert = (req,res)=>{
    console.log(req.body);
    const sql = `update wait set pass = 1,bookid = ? where id=? `
    db.query(sql, [req.body.bookid,req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改信息失败！')
      
        // 修改用户信息成功
        return res.cc('修改信息成功！', 0)
      })
      
  }
  