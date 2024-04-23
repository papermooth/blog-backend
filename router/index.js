// 引入 Koa Router 库
const Router = require('@koa/router')

// 引入 controller 模块
const homeCtrl = require('../controller/home')

// 创建路由器实例
const router = new Router()

// 配置路由
// - 测试用的 API
router.get('/api/test', homeCtrl.test)

// 导出路由器实例
module.exports = router