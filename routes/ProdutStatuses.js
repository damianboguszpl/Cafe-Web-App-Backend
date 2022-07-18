const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductStatusController')

// Get all ProductStatuses
router.get("/", controller.getAll)

// Get ProductStatus by id
router.get("/:id", controller.getById)

module.exports = router