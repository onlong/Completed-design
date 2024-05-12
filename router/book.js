const express = require('express')
// 创建路由对象
const router = express.Router()

const router_handler = require('../router_handler/book')


// 新增书籍
router.post('/release',  router_handler.release)


// 查看全部的路由
router.post('/see',  router_handler.see)
// 根据作者查看
router.post('/seewriter',  router_handler.seewriter)
// 查看未审核
router.post('/seestate',  router_handler.seestate)
router.post('/seeid',  router_handler.seeid)

// 修改
router.post('/insert',  router_handler.insert)

// 将路由对象共享出去
module.exports = router
