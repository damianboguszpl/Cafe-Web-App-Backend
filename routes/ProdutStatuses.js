const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductStatusController')

// Get all ProductStatuses
router.get("/", controller.getAll)

// Get ProductStatus by id
router.get("/:id", controller.getById)

// Get ProductStatus by name
router.get("/name/:name", controller.getByName)

module.exports = router