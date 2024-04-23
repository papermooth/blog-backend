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
    },
    
    async test2(ctx){
      ctx.body = {
        msg:'请求成功，通过鉴权'
      }
    }
  }