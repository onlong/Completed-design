/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require('../../db/index.js')

function timestampToTime(timestamp) {
  // 时间戳为10位需*1000，时间戳为13位不需乘1000
  var date = new Date(timestamp);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = date.getSeconds();
  return Y + M + D;
}

// 新增约稿的处理函数
exports.release = (req, res) => {
    const userinfo = req.body;
    console.log(userinfo);
    userinfo.date = new Date(userinfo.date);
    console.log(userinfo.date); 
    const sql =  `insert into invite set ?` 
    db.query(sql, { date: userinfo.date, 
        clessid: userinfo.clessid,
        description:userinfo.description,
        num:userinfo.num ,
        long:userinfo.long
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
  
  // 查看约稿的函数
  exports.seenew = (req, res) => {
    var thisdate = Date.now();
    var newdate = timestampToTime(thisdate)
    const sql = `select * from invite where del = 0 and date > ?`
    db.query(sql,newdate,function(err, results){
      console.log(sql);
        if(err) return res.cc(err)
        console.log(results);
        res.send({
            status: 0,
            message: '获取约稿信息成功！',
            data: results,
        })
    })
  }
  exports.see = (req, res) => {
    const sql = `select * from invite where del = 0 `
    db.query(sql,function(err, results){
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取约稿信息成功！',
            data: results,
        })
    })
  }
  exports.seeid = (req, res) => {
    const sql = `select * from invite where del = 0  and id = ?`
    db.query(sql,[req.body.id],function(err, results){
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取约稿信息成功！',
            data: results,
        })
    })
  }

  exports.insert = (req,res)=>{
    console.log(req.body);
    const sql = `update invite set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
      
        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
      })
      
  }
  