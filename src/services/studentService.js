const Student = require('../model/Student')
const Class = require('../model/Class')
const { Op } = require('sequelize')
const validate = require('validate.js')

// 新增学生
exports.addStudent = async function(studentInfo) {
  // console.log(studentInfo)
  // const rules = {
  //   studentName: {
  //     presence: {
  //       allowEmpty: false
  //     }
  //   }
  // }
  // const validateRes = await validate(studentInfo, rules)
  // console.log(validateRes)
  const res = await Student.create(studentInfo)

  return res.toJSON()
  
}

// 删除学生
exports.deleteStudent = async function(id){
  const res = await Student.destroy({
    where: {
      id
    }
  })

  return res
}

// 更新学生信息
exports.updateStudent = async function(studentInfo){
  const res = await Student.update(studentInfo, {
    where: {
      id: studentInfo.id
    }
  })

  return res
}

// 获取单个学生信息
exports.getStuInfoById = async function(id){
  const res = await Student.findByPk(id)
  if(res) {
    return res.toJSON()
  } else {
    console.log('学生信息不存在')
    return null
  }
}

// 获取学生分页数据 (方式一)
// exports.getStuPages = async function(params) {
//   params = Object.assign({ pageNo: 1, pageSize: 10 }, params)
//   const res = await Student.findAll({
//     offset: (params.pageNo - 1) * params.pageSize,
//     limit: params.pageSize,
//     include: [Class]
//   })
//   console.log(JSON.parse(JSON.stringify(res)))
//   const total = await Student.count()
//   console.log(total)
//   return {
//     code: 0,
//     total,
//     datas: JSON.parse(JSON.stringify(res))
//   }
// }

exports.getStuPages = async function(params) {
  params = Object.assign({ pageNo: 1, pageSize: 10 }, params)
  const where = {}
  if(params.studentName) {
    where.studentName = {
      [Op.like]: `%${params.studentName}%`
    }
  }
  const res = await Student.findAndCountAll({
    offset: (params.pageNo - 1) * params.pageSize,
    limit: params.pageSize,
    include: [Class],
    attributes: ["id", "studentName", "sex", "birthDate"],
    where
  })
  // console.log(res)
  // console.log(res.count)
  // console.log(JSON.parse(JSON.stringify(res.rows)))

  return {
    total: res.count,
    datas: JSON.parse(JSON.stringify(res.rows))
  }
}