const express = require('express')
const router = express.Router()
const controller = require('../controllers/PaymentController')

// Create new Payment
router.post("/", controller.create)

// Update Payment
router.put("/update/:id", controller.update)

// Delete Payment 
router.delete(`/:id`, controller.delete)

// Get all Payments
router.get("/", controller.getAll)

// Get Payment by id
router.get("/:id", controller.getById)

// Get Payment by name
router.get("/name/:name", controller.getByName)

module.exports = router