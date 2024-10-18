const express = require('express')
const router = express.Router()

// CONTROLLER
const userController = require('./controller/userController')
const bookingController = require('./controller/bookingController')

// MIDDLEWARE
const authMiddleware = require('./middleware/authMiddleware')

// ROUTER WITHOUT MIDDLEWARE
router.post('/login', userController.login)

// ROUTER WITH MIDDLEWARE
router.use(authMiddleware.isAuthenticated)

// USER
router.get('/identify', userController.identify)

// BOOKINGS
router.post('/booking', bookingController.createBooking)
router.get('/booking/:booking_id/driver', bookingController.findDriverNearby)

module.exports = router
