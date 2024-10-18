const driversModel = require('./driversModel')
const usersModel = require('./usersModel')
const bookingsModel = require('./bookingsModel')

usersModel.hasMany(bookingsModel, { foreignKey: 'user_id', sourceKey: 'id', as: 'bookings' })
bookingsModel.belongsTo(usersModel, { foreignKey: 'user_id', targetKey: 'id', as: 'user' })

driversModel.hasMany(bookingsModel, { foreignKey: 'driver_id', sourceKey: 'id', as: 'bookings' })
bookingsModel.belongsTo(driversModel, { foreignKey: 'driver_id', targetKey: 'id', as: 'driver' })

driversModel.belongsTo(usersModel, { foreignKey: 'user_id', targetKey: 'id', as: 'user' })

module.exports = {
  driversModel,
  usersModel,
  bookingsModel,
}
