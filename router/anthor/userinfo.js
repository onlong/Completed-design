// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
const router_handler = require('../../router_handler/anthor/userinfo.js')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
 // 导入需要的验证规则对象
const { update_userinfo_schema,update_password_schema } = require('../../schema/user.js')


// 获取作家的基本信息
router.post('/anthoruserinfo', router_handler.getUserInfo)

router.post('/all', router_handler.getall)

// 更新作家的基本信息 
router.post('/userinfo', router_handler.updateUserInfo)

//更新作家密码
router.post('/updatepwd', expressJoi(update_password_schema), router_handler.updatePassword)




// 向外共享路由对象
module.exports = router
