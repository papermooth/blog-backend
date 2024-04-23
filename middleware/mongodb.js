// 导入数据库连接模块
const mongoClient = require('../database/mongodb')

/**
 * 中间件工厂函数
 * 
 * 目的：在 ctx 对象上添加 mongoClient 实例
 * 作用：启用该中间件后，可在任意能获取到 ctx 的地方获取 mongoClient 实例来操作数据库，非常方便
 * 
 * @param {Object} options 中间件的配置项（不过当前的中间件无需作什么配置）
 * @returns 返回中间件函数
 */
module.exports = () => {
  // 返回真正的中间件函数
  return async (ctx, next) => {
    ctx.mongoClient = mongoClient
    await next()
  }
}