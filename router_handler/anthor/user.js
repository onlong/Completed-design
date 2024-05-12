/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require('../../db/index.js')
//加密包
const bcrypt = require('bcryptjs')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../../config')


// 注册用户的处理函数
exports.regUser = (req, res) => {
    // console.log(res.body.username);
    const userinfo = req.body
    if(!userinfo.name || !userinfo.password || !userinfo.email || !userinfo.tel){
      // return res.send({
      //   status:1,
      //   message:'用户名或密码不合法！！'
      // })
      return res.cc('用户名或密码不合法！！')
    }
    
    // console.log(userinfo);
    const sql = `select * from author where name=?`
    db.query(sql, [userinfo.name], function (err, results) {
      // 执行 SQL 语句失败
      if (err) {
        // return res.send({ status: 1, message: err.message })
        return res.cc(err)
      }
      // 用户名被占用
      if (results.length > 0) {
        // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
        return res.cc('用户名被占用，请更换其他用户名！')

      }
      // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
      userinfo.password = bcrypt.hashSync(userinfo.password, 10)
      const sql = 'insert into author set ?'
      db.query(sql, { name: userinfo.name, 
                      password: userinfo.password,
                      email:userinfo.email,
                      tel:userinfo.tel 
                    }, function (err, results) {
  // 执行 SQL 语句失败
  // console.log(userinfo);
  if (err) return res.cc(err)

  // SQL 语句执行成功，但影响行数不为 1
  if (results.affectedRows !== 1) {   
    // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
    return res.cc('注册用户失败，请稍后再试！')

  }
  // 注册成功
  // res.send({ status: 0, message: '注册成功！' })
  return res.cc('注册成功！',1)

})


    })
    
  }
  
  // 登录的处理函数
  exports.login = (req, res) => {
    const userinfo = req.body
    const sql = `select * from author where tel=?`
    db.query(sql, userinfo.tel, function (err, results) {
      // 执行 SQL 语句失败
      // console.log(results);
      if (err) return res.cc(err)
      // 执行 SQL 语句成功，但是查询到数据条数不等于 1
      if (results.length !== 1) return res.cc('登录失败！')
      
      // 拿着用户输入的密码,和数据库中存储的密码进行对比
      const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
      // 如果对比的结果等于 false, 则证明用户输入的密码错误
      if (!compareResult) {
        return res.cc('登录失败！')
      }
      // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
      const user = { ...results[0], password: '', }
      // console.log(user);
      // 生成 Token 字符串
      const tokenStr = jwt.sign(user, config.jwtSecretKey, {
        expiresIn: '10h', // token 有效期为 10 个小时
      })
      res.send({
        status: 0,
        message: '登录成功！',
        // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
        token: 'Bearer ' + tokenStr,
      })
    })
    // userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    



  }
  