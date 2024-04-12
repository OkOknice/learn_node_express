const sequelize = require('./db')
const { DataTypes, DATE } = require('sequelize')
const Class = require('./Class')

const Student = sequelize.define(
  'Student',
  {
    studentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(11),
      allowNull: false
    }
  },
  {
    paranoid: true,
    createdAt: false,
    updatedAt: false
  }
)

Student.belongsTo(Class)

module.exports = Student