const config = {
    // 相关配置
    mongodb: {
      uri: 'mongodb://root:123456@localhost:27017/classroom',
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        authSource: 'admin'
      }
    },
  
    // JWT Token 相关配置
    jwt: {
      // 密钥
      secret: 'my-blog-secret'
    }
  }
  
  // 导出
  module.exports = config