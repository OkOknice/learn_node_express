const Class = require('../model/Class')

// 新增班级
exports.addClass = async function(classInfo) {
  const res = await Class.create(classInfo)

  return res.toJSON()
}

// 删除班级
exports.deleteClass = async function(id) {
  const res = await Class.destroy({
    where: {
      id
    }
  })

  return res
}

// 更新班级信息
exports.updateClass = async function(classInfo){
  const res = await Class.update(classInfo, {
    where: {
      id: classInfo.id
    }
  })

  return res
}

// 查询某个班级的信息
exports.getClassInfoById = async function(id) {
  const res = await Class.findByPk(id)
  if(res) {
    return res.toJSON()
  } else {
    console.log('不存在该班级')
    throw new Error('不存在该班级')
  }
}

// 获取所有班级
exports.getAllClass = async function() {
  const res = await Class.findAll()
  return JSON.parse(JSON.stringify(res))
}