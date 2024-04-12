const Student = require('./Student')
const Class = require('./Class')

Class.hasMany(Student)
Student.belongsTo(Class)