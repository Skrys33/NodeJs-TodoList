const Sequelize = require('sequelize')
const db = require('../db')

const users  = db.define('users', {
  id: Sequelize.INT,
  username: Sequelize.STRING
});


module.exports = user