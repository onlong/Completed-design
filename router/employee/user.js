const express = require('express')
// 创建路由对象
const router = express.Router()

const router_handler = require('../../router_handler/employee/user.js')
// 1. 导入验证表单数据的中间件
// const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
// const { reg_login_schema,reg_reguser_schema } = require('../../schema/user')


// 新增新用户
router.post('/reguser',  router_handler.regUser)


// 登录的路由
router.post('/login',  router_handler.login)

// 将路由对象共享出去
module.exports = router
