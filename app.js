const Koa = require('koa')
const { koaBody } = require('koa-body')
const router = require('./router')
// 导入数据库中间件
const mongoMiddleware = require('./middleware/mongodb')
const app = new Koa()

app.use(koaBody({
  // 支持文件上传
  multipart: true,
  // 文件上传配置
  formidable: {
    // 上传文件保存目录
    uploadDir: './static/uploads',
    // 保留上传文件原来的后缀名
    keepExtensions: true
  }
}))

// 中间件：MongoDB 数据库操作辅助
app.use(mongoMiddleware())


// 中间件：路由相关
app.use(router.routes())
app.use(router.allowedMethods())

// 启动服务
app.listen(8000,()=>console.log('服务已启动'))