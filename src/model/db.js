const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('myschooldb', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  logging: null
})

module.exports = sequelize