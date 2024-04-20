const jwt = require('jsonwebtoken')
const secrect_key = 'qughhdkjashdkjhaoeuqwioyeiowqhdkjasgdjhsadkjwahkdhgg'

const { getErrorResult }  = require('./handleResult')
const { AUTH_CODE } = require('./constCode')
const whiteList = ['/api/admin/login', '/api/static/upload'] // 白名单

// 颁发 token
exports.publishToken = (res, info = {},  maxTime = 1000) => {
  const token = jwt.sign(info, secrect_key, {
    expiresIn: maxTime
  })

  res.header("authorization", token)

  return token
}

// 校验 token
exports.verifyToken = (req, res, next) => {
  // console.log(res.url)
  if(whiteList.includes(req.url)) {
    next()
    return
  }
  let token = ''
  if(req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1]
  }

  try {
    const result = jwt.verify(token, secrect_key)
    req.userId = result.id
    next()
  } catch {
    res.send(getErrorResult('登录失效', AUTH_CODE))
  }  
}