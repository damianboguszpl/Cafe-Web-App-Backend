const express = require('express')
const router = express.Router()
const controller = require('../controllers/ReservationController')

// Get all Reservations
router.get("/", controller.getAll)

// Get Reservation by id
router.get("/:id", controller.getById)

module.exports = router