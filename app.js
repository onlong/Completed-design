//导入框架
const express = require('express')
// 引入express-fileuplod
var fileUpload = require('express-fileupload');
//声明框架
const app = express()
//解决跨域问题，并挂载在app
const cors = require('cors')
app.use(cors())
// 解析表单数据的中间件

app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app.use(express.urlencoded({ extended: true }))

const joi = require('joi')

// 导入配置文件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require('express-jwt')




// 响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
      console.log(err instanceof Error ? err.message : err);
      res.send({
        // 状态
        status,
        // 状态描述，判断 err 是 错误对象 还是 字符串
        message: err instanceof Error ? err.message : err,
      })
    }
    next()
  })
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app
  .use(expressJWT({ secret: config.jwtSecretKey })
  .unless({ path: [
                    /^\/api\//,
                    /^\/employee\//,
                    /^\/my\//,
          ]}))


// 错误中间件  
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  if (err.name == 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})
// 导入并注册用户路由模块
const userRouter = require('./router/anthor/user')
app.use('/api', userRouter)

// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/anthor/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)// 导入并使用用户信息路由模块
// 导入并使用职工注册登录路由模块
const EURouter = require('./router/employee/user')
app.use('/employee/user', EURouter)
// 导入并使用职工信息路由模块
const EUURouter = require('./router/employee/userinfo')
app.use('/employee/my', EUURouter)
// 导入并使用约稿信息路由模块
const inviteRouter = require('./router/invite/invite')
app.use('/api/invite', inviteRouter)
// 导入并使用约稿信息路由模块
const BookRouter = require('./router/book')
app.use('/api/book', BookRouter)
//未测试
// 导入并使用约稿信息路由模块
const ReviewedRouter = require('./router/reviewed')
app.use('/api/reviewed', ReviewedRouter)

// 导入并使用约稿信息路由模块
const AuditRouter = require('./router/audit')
app.use('/api/audit', AuditRouter)

// 导入并使用约稿信息路由模块
const ProofreadRouter = require('./router/proofread')
app.use('/api/proofread', ProofreadRouter)

// 导入并使用约稿信息路由模块
const classRouter = require('./router/class')
app.use('/api/class', classRouter)
// 导入并使用待约稿信息路由模块
const waitRouter = require('./router/wait')
app.use('/api/wait', waitRouter)


// 使用express-fileupload中间件
app.use(fileUpload({
    defParamCharset: "utf8" // 添加utf8编码
}));

// 引入文件操作路由
var filesRouter = require('./router/file')
// 使用文件管理路由
app.use('/api/files', filesRouter)



//对后台进行监听
app.listen(3007,function(){
    console.log('api serer running at http://127.0.0.1');
})
