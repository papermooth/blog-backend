module.exports = {
  
    // 测试用的处理函数
    async test(ctx) {
  

    // return ctx.throw({ code: 40011, message: '一个错误2' })

    ctx.verifyParams({
      name: 'string'
    })

      ctx.body = {
        msg: 'hello,world jj hh'
      }
    }
    
  }