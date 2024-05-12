const express = require('express')
// 创建路由对象
const router = express.Router()

const router_handler = require('../router_handler/class')


// 新增书籍
router.post('/release',  router_handler.release)


// 查看全部的路由
router.post('/see',  router_handler.see)

// 修改
router.post('/insert',  router_handler.insert)

// 将路由对象共享出去
module.exports = router
