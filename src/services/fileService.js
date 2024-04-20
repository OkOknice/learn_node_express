const File = require('../model/File')


// 添加附件
exports.addFile = async(fileInfo) => {
  const res = await File.create(fileInfo)
  // console.log(res.toJSON())
  return res.toJSON()
}

// 获取附件
exports.getFile = async(attachmentId) =>{
  const res = await File.findOne({
    where: {
      attachmentId
    }
  })
  // console.log(res.toJSON())
  return res.toJSON()
}

// 删除附件
exports.deleteFile = async(attachmentId) => {
  const res = await File.destroy({
    where: {
      attachmentId
    }
  })
  return res
}