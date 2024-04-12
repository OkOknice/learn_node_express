// 管理员初始化
// 判断数据库中是否有管理员，如果没有，自动添加一个默认管理员
const Admin = require('../model/Admin')
const md5 = require('md5')

// 新增管理员
exports.addAdmin = async function(adminObj) {
  if(!adminObj.loginId || !adminObj.loginPwd) {
    console.log('用户名和密码不能空')
    return
  }
  const res = await Admin.findOne({
    where: {
      loginId: adminObj.loginId
    }
  })
  if(!res) {
    adminObj.loginPwd = md5(adminObj.loginPwd)
    const ins = await Admin.create(adminObj)
    return ins.toJSON()
  } else {
    console.log('用户已存在')
    throw new Error('用户已存在')
  }
}

// 删除管理员
exports.deleteAdmin = async function(id) {
  const res = await Admin.destroy({
    where: {
      id
    }
  })
  console.log(res)
  return res
}

// 更新管理员信息
exports.updateAdmin = async function(adminObj) {
  if(!adminObj.loginId || !adminObj.loginPwd) {
    console.log('用户名和密码不能空')
    return
  }
  const res = await Admin.findOne({
    where: {
      loginId: adminObj.loginId
    }
  })
  if(!res) {
    adminObj.loginPwd = md5(adminObj.loginPwd)
    const res = await Admin.update(adminObj, {
      where: {
        id: adminObj.id
      }
    })
    console.log(res)
    return res
  } else {
    console.log('用户已存在')
    throw new Error('用户已存在')
  }
}

// 登录账号
exports.login = async function(adminInfo) {
  adminInfo.loginPwd = md5(adminInfo.loginPwd)
  const res = await Admin.findOne({
    where: {
      loginId: adminInfo.loginId
    }
  })
  
  if(res) {
    if(res.toJSON().loginPwd !== adminInfo.loginPwd) {
      console.log('密码错误')
      throw new Error('密码错误')
    }
    // console.log(adminInfo.loginPwd)
    // console.log(res.toJSON())
    console.log('登录成功')
    return res.toJSON()
  } else {
    console.log('用户不存在～')
    throw new Error('用户不存在～')
  }
}

// 查询用户信息
exports.getAdminUserById = async function(id) {
  const res = await Admin.findByPk(id)
  // console.log(res)
  if(res) {
    // console.log('获取用户信息')
    // console.log(res.toJSON())
    return res.toJSON()
  } else {
    console.log('用户不存在～')
    throw new Error('用户不存在～')
  }
}

// 获取所有用户
exports.getAllAdminUser = async function() {
  const res = await Admin.findAll()
  return JSON.parse(JSON.stringify(res))
}