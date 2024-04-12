const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const Book = sequelize.define(
  'Books',
  {
    bookName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING
    },
    publishDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ahthor: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    paranoid: true
  }
)

module.exports = Book