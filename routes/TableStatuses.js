const express = require('express')
const router = express.Router()
const controller = require('../controllers/TableStatusController')

// Get all TableStatuses
router.get("/", controller.getAll)

// Get TableStatus by id
router.get("/:id", controller.getById)

// Get TableStatus by name
router.get("/name/:name", controller.getByName)

module.exports = router