const { ObjectId } = require('mongodb')


async function listArticlesByCategory(ctx, params) {
  // 处理参数
  const categoryId = params.categoryId
  const pageNo = parseInt(params.pageNo) || 1
  const pageSize = parseInt(params.pageSize) || 10

  // 查询条件
  const filter = {}

  // 如果传入了分类，则对文章按照分类进行过滤
  if (categoryId) {
    filter.categoryId = {
      $eq:new ObjectId(categoryId)
    }
  }


  // 执行分页查询
  const articleColl = ctx.mongoClient.db().collection('articles')
  // 1. 查询所有符合条件的记录总数
  const total = await articleColl.countDocuments(filter)
  // 2. 聚合, 进行联表查询
  const items = await articleColl.aggregate([
    // 过滤条件
    { $match: filter },
    // 按照日期, 由近到远, 新添加在前
    { $sort: { createdAt: -1 }},
    // 跳过的条数
    { $skip: (pageNo - 1) * pageSize },
    // 限制一页的条数
    { $limit: pageSize },
    // 根据用户 Id, 联表查询出用户的详细信息
    {
      $lookup: {
        from: "users",
        localField: 'ownerId',
        foreignField: '_id',
        as: 'owner'
      }
    },
    // 上述联表查询出来的结果, 是一个数组包对象的格式
    { $unwind: '$owner' },
    // 根据分类 Id, 联表查询出分类的详细信息
    {
      $lookup: {
        from: "categories",
        localField: 'categoryId',
        foreignField: '_id',
        as: 'categories'
      }
    },
    // 上述联表查询出来的结果, 是一个数组包对象的格式
    { $unwind: '$categories' },
    // 去掉一些不需要的字段
    {
      $project: {
        ownerId: 0,
        categoryId: 0,
        owner: {
          username: 0,
          password: 0,
        },
        content: 0
      }
    }
  ]).toArray()

  return { total, items }
}

async function getArticleDetail (ctx, id) {

    // 执行分页查询
    const articleColl = ctx.mongoClient.db().collection('articles')
    // 聚合, 进行联表查询
    const items = await articleColl.aggregate([
      // 过滤条件
      { $match: { _id:new ObjectId(id)} },
      // 根据用户 Id, 联表查询出用户的详细信息
      {
        $lookup: {
          from: "users",
          localField: 'ownerId',
          foreignField: '_id',
          as: 'owner'
        }
      },
      // 上述联表查询出来的结果, 是一个数组包对象的格式
      { $unwind: '$owner' },
      // 根据分类 Id, 联表查询出分类的详细信息
      {
        $lookup: {
          from: "categories",
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categories'
        }
      },
      // 上述联表查询出来的结果, 是一个数组包对象的格式
      { $unwind: '$categories' },
      {
        $project: {
          ownerId: 0,
          categoryId: 0,
          owner: {
            username: 0,
            password: 0
          }
        }
      }
    ]).toArray()
  
    return items[0]
  }
  

module.exports = {
  listArticlesByCategory,
  getArticleDetail
}