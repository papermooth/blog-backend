const Koa = require('koa')
const { koaBody } = require('koa-body')
const router = require('./router')
const koaStatic = require('koa-static')
const mongoMiddleware = require('./middleware/mongodb')
const app = new Koa()
const koaCors = require('@koa/cors')
const koaError = require('koa-json-error')
const koaParameter = require('koa-parameter')
const koaJwt = require('koa-jwt')
const config = require('./config/config.default')

koaParameter(app)
app.use(koaCors())

app.use(koaStatic('./static'))

// 中间件：统一错误处理和错误信息输出
app.use(koaError({
  // 自定义出错时，接口返回数据的格式
  format: (err, obj) => {

    if (obj.code === 'INVALID_PARAM') {

      return {
        code: 40022,
        message: '存在不合法参数！'
      }
    }

    return {
      code: obj.code || 50000,
      message: obj.message || err.message
    }
  }
}))

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



app.use(koaJwt({
  secret: config.jwt.secret   // JWT 密钥
}).unless({
  path: [/^\/api\/(?!user)/]  // 只对起始路径为 /api/user 的 API 接口进行鉴权
}))

// 中间件：路由相关
app.use(router.routes())
app.use(router.allowedMethods())

// 启动服务
app.listen(8000,()=>console.log('服务已启动'))