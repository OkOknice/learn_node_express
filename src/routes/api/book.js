const express = require('express')
const { handleResult } = require('../handleResult')
const { getBookInfoById, addBook, updateBook, deleteBook } = require('../../services/bookService')

const router = express.Router()

// 处理书本信息
const handleBookInfo = async(req, res, next) => {
  const id = req.params.id
  return await getBookInfoById(id)
}
// 处理书本新增
const handleAddBook = async(req, res, next) => {
  const params = req.body
  return await addBook(params)
}
// 处理书本更新
const handleUpdateBook = async(req, res, next) => {
  const params = req.body
  return await updateBook(params)
}
// 处理书本删除
const handleDeleteBook = async(req, res, next) => {
  const id = req.params.id
  return await deleteBook(id)
}

// 获取书本信息
router.get('/info/:id', handleResult(handleBookInfo))

//新增书本
router.post('/add', handleResult(handleAddBook))

// 更新书本
router.post('/update', handleResult(handleUpdateBook))

// 删除书本
router.delete('/delete/:id', handleResult(handleDeleteBook))

module.exports = router