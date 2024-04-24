const {
    listArticlesByCategory,getArticleDetail
  } = require('../service/blog')
  
  module.exports = {
  
    async listArticlesByCategory(ctx) {
      // 获取分类下的文章分页数据
      const result = await listArticlesByCategory(ctx, ctx.query)
  
      // 返回成功数据
      ctx.body = {
        code: 0,
        message: '获取分类下的文章成功',
        data: result
      }
    },

    async getArticleDetail(ctx) {
        // 获取文章的各项详情，包括分类、用户等信息
        const result = await getArticleDetail(ctx, ctx.params.id)
    
        // 返回成功数据
        ctx.body = {
          code: 0,
          message: '获取文章详情成功',
          data: result
        }
      }
  
  }