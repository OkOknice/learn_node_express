const Book = require('../model/Book')

// 新增书本
exports.addBook = async function(bookInfo) {
  const res = await Book.create(bookInfo)
  return res.toJSON()
}

// 删除书本
exports.deleteBook = async function(id) {
  const res = await Book.destroy({
    where: {
      id
    }
  })
  
  return res
}

// 更新书本信息
exports.updateBook = async function(bookInfo){
  const res = await Book.update(bookInfo, {
    where: {
      id: bookInfo.id
    }
  })

  return res
}

// 获取书本信息
exports.getBookInfoById = async function(id){
  const res = await Book.findByPk(id)
  if(res) {
    return res.toJSON()
  } else {
    return null
  }
}

// 获取所有书本数据
exports.getAllBook = async function(){
  const res = await Book.findAll()

  return JSON.parse(JSON.stringify(res))
}