const express = require('express')
const router = express.Router()
const controller = require('../controllers/ReservationController')

// Create new Reservation
router.post("/", controller.create)

// Update Reservation
router.put("/update/:id", controller.update)

// Delete Reservation 
router.delete(`/:id`, controller.delete)

// Get all Reservations
router.get("/", controller.getAll)

// Get Reservation by id
router.get("/:id", controller.getById)

// Get Reservation by ClientId
router.get("/client/:id", controller.getByClientId)

// Get Reservation by TableId
router.get("/table/:id", controller.getByTableId)

module.exports = router