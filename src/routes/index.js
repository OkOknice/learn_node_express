const express = require('express')
const path = require('path')

const studentRouter = require('./api/student')
const adminRouter = require('./api/admin')
const classRouter = require('./api/class')
const bookRouter = require('./api/book')
const uploadRouter = require('./api/upload')

const { verifyToken } = require('./jwt')


const app = express()

// 处理静态资源
const staticRoot = path.resolve(__dirname, '../../public')
app.use(express.static(staticRoot))


// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }))

// 解析 application/json 格式的请求体
app.use(express.json())

// 校验 token
// app.use(verifyToken)


// api 请求
app.use('/api/student', studentRouter)
app.use('/api/admin', adminRouter)
app.use('/api/class', classRouter)
app.use('/api/book', bookRouter)
app.use('/api/static', uploadRouter)

app.use(require('./errMiddleware'))



app.listen(9000, () => {
  console.log('服务器启动成功🚀')
})