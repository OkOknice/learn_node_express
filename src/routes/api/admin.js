const express = require('express')
const { handleResult } = require('../handleResult')
const { getAdminUserById, login, addAdmin, updateAdmin, deleteAdmin } = require('../../services/adminServices')
const { publishToken } = require('../jwt')

const router = express.Router()

// 处理用户信息
const handleUserInfo = async(req, res, next) => {
  const id = req.userId
  return await getAdminUserById(id)
}
// 处理登录
const handleLogin = async(req, res, next) => {
  const params = req.body
  const result = await login(params)
  console.log(result)
  const token = publishToken(res, { id: result.id, logind: result.loginId })

  return token
}
// 处理注册用户
const handleAddUser = async(req, res, next) => {
  const params = req.body
  return await addAdmin(params)
}
// 处理更新用户信息
const handleUpdateUser = async(req, res, next) => {
  const params = req.body
  return updateAdmin(params)
}
// 处理删除用户
const handleDeleteUser = async(req, res, next) => {
  const id = req.params.id
  return await deleteAdmin(id)
}



// 获取用户信息
router.get('/info', handleResult(handleUserInfo))

// 登录
router.post('/login', handleResult(handleLogin))

// 注册用户
router.post('/add', handleResult(handleAddUser))

// 更新用户
router.post('/update', handleResult(handleUpdateUser))

// 删除用户
router.delete('/delete/:id', handleResult(handleDeleteUser))


module.exports = router