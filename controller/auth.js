const {doRegister,generateCaptcha,doLogin} = require('../service/auth')
module.exports={
    async register(ctx){
        ctx.verifyParams({
            username: "string",		
            nickname: "string",	
            password: "string"
        })
        await doRegister(ctx,ctx.request.body)

      
        ctx.body={
            code:0,
            message:'注册成功',
            data:true
        }
    },
    async captcha(ctx) {
      // 生成验证码
      const result = await generateCaptcha(ctx)
  
      // 返回成功数据
      ctx.body = {
        code: 0,
        message: '获取验证码成功',
        data: result
      }
    },

    async login(ctx) {
      // 校验参数
      ctx.verifyParams({
      username: "string",
      password: "string",
      captchaKey: 'string',
      captchaCode: 'string'
      })
  
      // 登录并获取 JWT Token
      const token = await doLogin(ctx, ctx.request.body)
  
      // 返回成功数据
      ctx.body = {
        code: 0,
        message: '登录成功',
        data: token
      }
    },
}

