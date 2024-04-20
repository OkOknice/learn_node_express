const sequelize  = require('./db')
const { DataTypes } = require('sequelize')


const File = sequelize.define('File', {
  attachmentId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  downloadUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
},{
  createdAt: false,
  updatedAt: false,
  paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
})

module.exports = File