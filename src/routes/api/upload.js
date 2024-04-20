const express = require('express')
const multer  = require('multer')
const path = require('path')
const fs = require('fs')
const { getErrorResult } = require('../handleResult')
const { addFile, getFile, deleteFile } = require('../../services/fileService')
const { getUUID } = require('../../utils/tools')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../../public/uploads'))
  },
  filename: (req, file, cb) => {
    const timeStamp = Date.now();
    const ramdomStr = Math.random().toString(36).slice(-6);
    const ext = path.extname(file.originalname);
    const filename = `${timeStamp}-${ramdomStr}${ext}`;
    cb(null, filename);
  }
})

const upload = multer({
  // dest: path.resolve(__dirname, '../../../public/uploads')
  storage,
  limits: {
    fileSize: 100 * 1024
  }
})

// 上传图片
router.post('/upload', upload.single('file'), async(req, res, next) => {

  const fileInfo = {
    size: req.file.size,
    filename: req.file.filename,
    originalname: req.file.originalname,
    attachmentId: getUUID(),
    downloadUrl: `/uploads/${req.file.filename}`
  }
  const fileResult = await addFile(fileInfo)
  res.send({
    code: 800200,
    data: {
      attachmentId: fileResult.attachmentId
    },
    message: 'success'
  })
  
})

// 获取附件
router.get('/download/:attachmentId', async(req, res, next) => {
  const attachmentId = req.params.attachmentId
  const fileResult = await getFile(attachmentId)

  const absPath = path.resolve(__dirname, '../../../public/uploads',fileResult.filename)
  res.download(absPath)
})

// 删除附件
router.get('/delete/:attachmentId', async(req, res, next) => {
  const attachmentId = req.params.attachmentId
  const fileResult = await getFile(attachmentId)
  await deleteFile(attachmentId)
  const absPath = path.resolve(__dirname, '../../../public/uploads',fileResult.filename)
  fs.unlink(absPath, async() => {
    res.send({
      code: 800200,
      message: 'success'
    })
  })
})


module.exports = router