const {ObjectId } = require('mongodb')
const { hash, compare } = require('bcrypt')

/**
 * 获取个人资料
 */
async function getCurrentUserProfile(ctx) {
  // 处理参数
  const currentUserId =new ObjectId(ctx.state.user.sub)

  // 查询用户信息
  const userColl = ctx.mongoClient.db().collection('users')
  const result = await userColl.findOne({ _id: currentUserId })

  return result
}

async function updateProfileBaseInfo(ctx, params) {
    // 处理参数
    const currentUserId =new ObjectId(ctx.state.user.sub)
    const nickname = params.nickname
  
    // 修改个人资料
    const userColl = ctx.mongoClient.db().collection('users')
    await userColl.updateOne({
      _id: currentUserId
    }, {
      $set: {
        nickname
      }
    })
  }
  async function updateProfilePassword(ctx, params) {
    // 处理参数
    const currentUserId =new ObjectId(ctx.state.user.sub)
    const oldPassword = params.oldPassword
    const newPassword = params.newPassword
  
    // 获取当前用户
    const userColl = ctx.mongoClient.db().collection('users')
    const user = await userColl.findOne({ _id: currentUserId })
  
    // 对比输入的旧密码是否正确
    const isValidOldPass = await compare(oldPassword, user.password)
    if (!isValidOldPass) {
      return ctx.throw({ code: 10302, message: '输入的旧密码不正确！' })
    }
  
    // 修改成新密码
    const passwordHash = await hash(newPassword, 10)
    await userColl.updateOne({
      _id: currentUserId
    }, {
      $set: {
        password: passwordHash
      }
    })
  }
  async function updateProfileAvatar(ctx, params) {
    // 处理参数
    const currentUserId =new ObjectId(ctx.state.user.sub)
    const avatar = params.avatar
  
    // 修改成新的头像地址
    const userColl = ctx.mongoClient.db().collection('users')
    await userColl.updateOne({
      _id: currentUserId
    }, {
      $set: {
        avatar
      }
    })
  }
  
  
  

module.exports = {
  getCurrentUserProfile,
  updateProfileBaseInfo,
  updateProfilePassword,
  updateProfileAvatar,
}