const express = require('express')
const router = express.Router()
const controller = require('../controllers/ReservationController')

// Get all Reservations
router.get("/", controller.getAll)

// Get Reservation by id
router.get("/:id", controller.getById)

// Get Reservation by ClientId
router.get("/client/:id", controller.getByClientId)

// Get Reservation by TableId
router.get("/table/:id", controller.getByTableId)

module.exports = router