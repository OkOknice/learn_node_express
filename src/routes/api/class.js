const express = require('express')
const { handleResult } = require('../handleResult')
const { getClassInfoById, addClass, updateClass, deleteClass } = require('../../services/classService')

const router = express.Router()


// 处理班级信息
const handleClassInfo = async(req, res, next) => {
  const id = req.params.id
  return await getClassInfoById(id)
}
// 处理班级新增
const handleAddClass = async(req, res, next) => {
  const params = req.body
  return await addClass(params)
}
// 处理班级更新
const handleUpdateClass = async(req, res, next) => {
  const params = req.body
  return await updateClass(params)
}
// 处理班级删除
const handleDeleteClass = async(req, res, next) => {
  const id = req.params.id
  return await deleteClass(id)
}

// 获取班级信息
router.get('/info/:id', handleResult(handleClassInfo))

//新增班级
router.post('/add', handleResult(handleAddClass))

// 更新班级
router.post('/update', handleResult(handleUpdateClass))

// 删除班级
router.delete('/delete/:id', handleResult(handleDeleteClass))

module.exports = router