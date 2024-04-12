const express = require('express')
const { getStuPages, addStudent, updateStudent, deleteStudent, getStuInfoById } = require('../../services/studentService')
const { handleResult } = require('../handleResult')

const router = express.Router()

// 处理分页
const handlePage = async(req, res, next) => {
  const { pageNo, pageSize, studentName } = req.query
  const params = {
    pageNo: Number(pageNo),
    pageSize: Number(pageSize),
    studentName: studentName || ''
  }
  return await getStuPages(params)
}

// 处理新增学生
const handleAddStu = async(req, res, next) => {
  const params = req.body
  return await addStudent(params)
}

// 处理更新学生
const handleUpdateStu = async(req, res, next) => {
  const params = req.body
  return await updateStudent(params)
}

// 处理删除学生
const handleDeleteStu = async(req, res, next) => {
  const id = req.params.id
  return await deleteStudent(id)
}

// 处理获取学生信息
const handleStuInfo = async(req, res, next) => {
  const id = req.params.id
  return await getStuInfoById(id)
}

// 分页
// router.get('/pages', async (req, res) => {
//   const { pageNo, pageSize, studentName } = req.query
//   const params = {
//     pageNo: Number(pageNo),
//     pageSize: Number(pageSize),
//     studentName: studentName || ''
//   }
//   try {
//     const result = await getStuPages(params)
//     res.send({
//       code: SUCCESS_CODE,
//       message: 'success',
//       data: {
//         records: result.datas,
//         total: result.total
//       }
//     })
//   } catch (error) {
//     getErrorResult()
//   }
// })
// 分页
router.get('/pages', handleResult(handlePage))

// 新增学生
router.post('/add', handleResult(handleAddStu))

// 更新学生信息
router.post('/update', handleResult(handleUpdateStu))

// 删除学生
router.get('/delete/:id', handleResult(handleDeleteStu))

// 获取学生信息
router.get('/info/:id', handleResult(handleStuInfo))

module.exports = router