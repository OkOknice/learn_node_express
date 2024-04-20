const Sequelize = require('./db')


require('./Admin')
require('./Book')
require('./Class')
require('./Student')
require('./File')

Sequelize.sync(
  {
    alter: true
  }
).then(() => {
  console.log("所有模型同步完成");
})