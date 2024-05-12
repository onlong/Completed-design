const express = require('express')
// 创建路由对象
const router = express.Router()

const router_handler = require('../../router_handler/invite/invite')


// 新增
router.post('/release',  router_handler.release)


// 查看全部的路由
router.post('/see',  router_handler.see)
router.post('/seenew',  router_handler.seenew)
router.post('/seeid',  router_handler.seeid)

// 修改的路由
router.post('/insert',  router_handler.insert)

// 将路由对象共享出去
module.exports = router
