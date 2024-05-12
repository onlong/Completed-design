// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
const router_handler = require('../../router_handler/employee/userinfo')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
 // 导入需要的验证规则对象
const { update_userinfo_schema,update_password_schema } = require('../../schema/user.js')


// 获取职工的基本信息
router.post('/getuserinfo', router_handler.getUserInfo)

// 更新职工的基本信息 
router.post('/updateUserInfo', router_handler.updateUserInfo)

router.post('/seeall', router_handler.seeall)

//更新职工密码
router.post('/updatepwd', router_handler.updatePassword)




// 向外共享路由对象
module.exports = router
