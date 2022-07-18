const express = require('express')
const router = express.Router()
const controller = require('../controllers/PaymentController')

// Get all Payments
router.get("/", controller.getAll)

// Get Payment by id
router.get("/:id", controller.getById)

module.exports = router