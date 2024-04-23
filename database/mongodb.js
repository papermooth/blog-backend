// 引入 MongoDB 驱动包
const { MongoClient } = require('mongodb')

// 引入配置文件
const config = require('../config/config.default')

// 创建 MongoDB 客户端实例，相关配置信息从配置文件中获取
const client = new MongoClient(config.mongodb.uri, config.mongodb.options)

// 开始连接 MongoDB 服务器
client.connect()

// 导出客户端实例
module.exports = client