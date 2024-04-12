const Mock = require('mockjs')

const result = Mock.mock({
  'datas|16': [
    {
      "id|+1": 1,
      className: "前端第 @id 期",
      openDate: "@date"
    }
  ]
})

// console.log(result.datas)

const Class = require('../model/Class')
Class.bulkCreate(result.datas)