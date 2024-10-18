require('dotenv').config()
const { Sequelize } = require('sequelize')

const pgsql = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  // logging: false,
})

const pgsql_kc = new Sequelize(process.env.DB_KC_NAME, process.env.DB_KC_USER, process.env.DB_KC_PASS, {
  host: process.env.DB_KC_HOST,
  port: process.env.DB_KC_PORT,
  dialect: 'postgres',
})

pgsql
  .authenticate()
  .then(async () => {
    console.info(`Connection to ${process.env.DB_HOST}:${process.env.DB_NAME} SUCCESS`)
  })
  .catch((err) => {
    console.error(`Failed to connect to ${process.env.DB_HOST}:${process.env.DB_NAME} with error ${err}`)
  })

pgsql_kc
  .authenticate()
  .then(async () => {
    console.info(`Connection to ${process.env.DB_KC_HOST}:${process.env.DB_KC_NAME} SUCCESS`)
  })
  .catch((err) => {
    console.error(`Failed to connect to ${process.env.DB_KC_HOST}:${process.env.DB_KC_NAME} with error ${err}`)
  })

module.exports = { pgsql, pgsql_kc }
