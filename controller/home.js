module.exports = {
  
    // 测试用的处理函数
    async test(ctx) {
       // 获取 mongClient 实例
    console.log(ctx.mongoClient); 
      ctx.body = {
        msg: 'hello,world'
      }
    }
    
  }