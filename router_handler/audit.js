/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require('../db/index.js')


// 新增约稿的处理函数
exports.release = (req, res) => {
    const userinfo = req.body;
    // var thisdate = Date.now();
    var date = new Date()
    const sql =  `insert into audit set ?` 
    db.query(sql, { date: date, 
        opinion: userinfo.opinion,
        nameid:userinfo.nameid,
        bookid:userinfo.bookid,
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
  }
  
  // 查看
  exports.see = (req, res) => {
    const sql = `select * from audit where bookid = ?`
    db.query(sql,[req.body.bookid],function(err, results){
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取约稿信息成功！',
            data: results,
        })
    })
  }
//修改
  exports.insert = (req,res)=>{
    const sql = `update audit set ? where bookid=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
      
        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
      })
      
  }
  