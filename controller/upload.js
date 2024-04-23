module.exports = {

    async uploadImage(ctx) {
        console.log(ctx.request.files.file);
      // 获取上传的文件信息
      const file = ctx.request.files.file

      // 去除路径中前面的 static 部分，只留下后面的一段路径
      const location = file.filepath.replace('static', '')
  
    
  
      // 返回成功数据
      ctx.body = {
        code: 0,
        message: '上传成功',
        data: {
          location
        }
      }
    }
  
  }