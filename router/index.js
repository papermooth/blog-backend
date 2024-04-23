// 引入 Koa Router 库
const Router = require('@koa/router')
const authCtrl = require('../controller/auth')
// 引入 controller 模块
const homeCtrl = require('../controller/home')
const categoryCtrl = require('../controller/categories')
const router = new Router()
// 配置路由
// - 测试用的 API
// router.get('/api/test', homeCtrl.test)
router.get('/api/user/test',homeCtrl.test2)
router.post('/api/register',authCtrl.register)
router.get('/api/captcha', authCtrl.captcha)
router.post('/api/login', authCtrl.login)
router.get('/api/categories', categoryCtrl.list)

// 导出路由器实例
module.exports = router