const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderStatusController')

// Create new OrderStatus
router.post("/", controller.create)

// Update OrderStatus
router.put("/update/:id", controller.update)

// Delete OrderStatus 
router.delete(`/:id`, controller.delete)

// Get all OrderStatuses
router.get("/", controller.getAll)

// Get OrderStatus by id
router.get("/:id", controller.getById)

// Get OrderStatus by name
router.get("/name/:name", controller.getByName)

module.exports = router