const { createArticle,listArticles,getArticleById,removeArticle,updateArticle } = require('../service/article')

module.exports = {
  
  async create(ctx) {
    // 校验参数
    ctx.verifyParams({
      categoryId: "string",
      title: "string",
      summary: "string",
      content: "string",
    })
console.log(ctx.request.body)
    // 创建文章
    await createArticle(ctx, ctx.request.body)

    // 返回成功数据
    ctx.body = {
      code: 0,
      message: '文章录入成功',
      data: true
    }
  },

  async list(ctx) {
    // 查询文章
    const result = await listArticles(ctx, ctx.query)

    // 返回成功的数据
    ctx.body = {
      code: 0,
      message: '获取文章分页数据成功',
      data: result
    }
  },
  async detail(ctx) {
    // 获取路径中的动态参数 id
    const id = ctx.params.id

    // 查询文章详情
    const result = await getArticleById(ctx, id)

    // 返回成功数据
    ctx.body = {
      code: 0,
      message: '文章获取成功',
      data: result
    }
  },

  async remove(ctx) {
    // 获取路径中的动态参数 id
    const id = ctx.params.id

    // 删除文章
    await removeArticle(ctx, id)

    // 返回成功数据
    ctx.body = {
      code: 0,
      message: '文章删除成功',
      data: true
    }
  },

  async update(ctx) {
    // 校验参数
    ctx.verifyParams({
      categoryId: "string",
      title: "string",
      summary: "string",
      content: "string",
    })

    // 获取路径中的动态参数 id
    const id = ctx.params.id

    // 修改文章
    await updateArticle(ctx, id, ctx.request.body)

    // 返回成功数据
    ctx.body = {
      code: 0,
      message: '文章修改成功',
      data: true
    }
  },


  
}