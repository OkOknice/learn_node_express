const { getErrorResult } = require('./handleResult')

module.exports = (err, req, res, next) => {
  if(err) {
    console.log(err.MulterError)
    res.send(getErrorResult(err.messgage))
  } else {
    next()
  }
}