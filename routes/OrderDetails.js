const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderDetailsController')

// Get all OrderDetails
router.get("/", controller.getAll)

// Get OrderDetails by id
router.get("/:id", controller.getById)

module.exports = router