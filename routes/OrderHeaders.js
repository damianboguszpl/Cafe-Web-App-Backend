const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderHeaderController')

// Get all OrderHeaders
router.get("/", controller.getAll)

// Get OrderHeader by id
router.get("/:id", controller.getById)

module.exports = router