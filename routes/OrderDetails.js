const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderDetailsController')

// Create new OrderDetails
router.post("/", controller.create)

// Update OrderDetails
router.put("/update/:id", controller.update)

// Delete OrderDetails 
router.delete(`/:id`, controller.delete)

// Get all OrderDetails
router.get("/", controller.getAll)

// Get OrderDetails by id
router.get("/:id", controller.getById)

// Get OrderDetails by ProductId
router.get("/product/:id", controller.getByProductId)

// Get OrderDetails by OrderHeaderId
router.get("/orderheader/:id", controller.getByOrderHeaderId)

module.exports = router