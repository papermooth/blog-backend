const { hash, compare } = require('bcrypt')
const svgCaptcha= require('svg-captcha')
const { Base64 } = require('js-base64')
const jwt = require('jsonwebtoken')
const config = require('../config/config.default')
// const { bjectID } = require('mongodb')
const { ObjectId } = require('mongodb');

  async function checkUsernameExist(ctx, username) {
    const coll = ctx.mongoClient.db().collection('users')
    const user = await coll.findOne({ username })
    return !!user
  }
  
  
  async function doRegister(ctx, userInfo) {
    // 获取参数
    const { username, password, nickname } = userInfo
  
    // 检查是否有用户名重复的数据
    const isExist = await checkUsernameExist(ctx, username)
  
    if (isExist) {
      return ctx.throw({ code: 10001, message: '该用户名已存在！' })
    }
  
    // 将密码明文使用 bcrypt 加密
    const passwordHash = await hash(password, 10)
  
    // 向数据库插入一条数据
    const coll = ctx.mongoClient.db().collection('users')
    const result = await coll.insertOne({
      username,
      nickname,
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return !!result.insertedId
  }
  
  
  async function generateCaptcha(ctx) {
    // 创建验证码
    const captcha = svgCaptcha.create()
  
    // 缓存验证码文本数据
    const coll = ctx.mongoClient.db().collection('captcha')
    const result = await coll.insertOne({
      text: captcha.text,
      createdAt: new Date()   // 必须设置，用于验证码的过期检测
    })
  
    // 将 svg 图片内容转成 base64 字符串格式，方便在 HTML 中通过 <img> 标签显示
    const base64Svg = Base64.encode(captcha.data)
  
    return {
      key: result.insertedId,
      svg: `data:image/svg+xml;base64,${base64Svg}`
    }
  }


  async function doLogin(ctx, loginInfo) {
    // 获取参数
    const { username, password, captchaKey, captchaCode } = loginInfo
  
    // 查找数据库中是否存在该验证码
    const captColl = ctx.mongoClient.db().collection('captcha')
    // console.log(captchaKey)

    const captcha = await captColl.findOne({_id: new ObjectId(captchaKey) })
    if (!captcha) {
      return ctx.throw({ code: 10002, message: '验证码已过期，请重新获取验证码！' })
    }
  
    // 从数据库中清除该验证码
    // await captColl.deleteOne({ _id: ObjectId(captchaKey) })
  
    // 对比验证码（不区分大小写）
    if (captcha.text.toUpperCase() !== captchaCode.toUpperCase()) {
      return ctx.throw({ code: 10003, message: '验证码不正确，请重新获取验证码！' })
    }
  
    // 根据账号查找用户
    const userColl = ctx.mongoClient.db().collection('users')
    const userObj = await userColl.findOne({ username })
    if (!userObj) {
      return ctx.throw({ code: 10004, message: '用户名不正确！' })
    }
  
    // 对比密码
    const isValidPassword = await compare(password, userObj.password)
    if (!isValidPassword) {
      return ctx.throw({ code: 10005, message: '密码不正确！' })
    }
  
    // 生成 JWT Token
    const token = jwt.sign({
      sub: userObj._id.toString(),
      username
    }, config.jwt.secret, {
      expiresIn: '36000s'
    })
  
    return token
  }
  

  
  module.exports = {
    // checkUsernameExist,
    doRegister,
   
    generateCaptcha,
    doLogin
  }

