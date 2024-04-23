async function getAllCategories(ctx) {
    // 查询所有分类
    const coll = ctx.mongoClient.db().collection('categories')
    return coll.find().toArray()
  }
  
  module.exports = {
    getAllCategories
  }