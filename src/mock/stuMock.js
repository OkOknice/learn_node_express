const Mock = require('mockjs')

const result = Mock.mock({
  "list|700-1000": [
    {
      studentName: "@cname",
      birthDate: "@date",
      "sex|1-2": true,
      phoneNumber: /1\d{10}/,
      "ClassId|1-16": 0
    }
  ]
})

console.log(result.list)
const Student = require('../model/Student')
Student.bulkCreate(result.list)