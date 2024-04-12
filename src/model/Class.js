const sequelize = require('./db')
const { DataTypes } = require('sequelize')
const Student = require('./Student')

const Class = sequelize.define(
  'Class',
  {
    className: {
      type: DataTypes.STRING,
      allowNull: false
    },
    openDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    paranoid: true,
    createdAt: false,
    updatedAt: false
  }
)

// Class.hasMany(Student)

module.exports = Class