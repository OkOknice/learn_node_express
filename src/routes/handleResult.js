const { COMMON_CODE, SUCCESS_CODE } = require('./constCode')

exports.getErrorResult = (message = 'failed', code = COMMON_CODE) => {
  return {
    code,
    message,
    data: null
  }
}

const getSuccessResult = (data = null) => {
  return {
    code: SUCCESS_CODE,
    message: 'success',
    data
  }
}


exports.handleResult = (callback) => {
  if(!callback) return
  return async(req, res, next) => {
    try {
      const result = await callback(req, res, next)
      res.send(getSuccessResult(result))
    } catch(error) {
      res.send(exports.getErrorResult(error.message))
    }
    
  }
}