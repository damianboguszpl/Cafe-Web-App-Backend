const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderDetailsController')

// Get all OrderDetails
router.get("/", controller.getAll)

// Get OrderDetails by id
router.get("/:id", controller.getById)

// Get OrderDetails by ProductId
router.get("/product/:id", controller.getByProductId)

// Get OrderDetails by OrderHeaderId
router.get("/orderheader/:id", controller.getByOrderHeaderId)

module.exports = router