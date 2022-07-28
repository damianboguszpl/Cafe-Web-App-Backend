const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderHeaderController')

// Create new OrderHeader
router.post("/", controller.create)

// Update OrderHeader
router.put("/update/:id", controller.update)

// Delete OrderHeader 
router.delete(`/:id`, controller.delete)

// Get all OrderHeaders
router.get("/", controller.getAll)

// Get OrderHeader by id
router.get("/:id", controller.getById)

// Get OrderHeader by PaymentId
router.get("/product/:id", controller.getByPaymentId)

// Get OrderHeader by ClientId
router.get("/client/:id", controller.getByClientId)

// Get OrderHeader by EmployeeId
router.get("/employee/:id", controller.getByEmployeeId)

// Get OrderHeader by OrderStatusId
router.get("/orderstatus/:id", controller.getByOrderStatusId)

// Get OrderHeader by ReviewId
router.get("/review/:id", controller.getByReviewId)

module.exports = router