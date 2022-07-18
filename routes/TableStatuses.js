const express = require('express')
const router = express.Router()
const controller = require('../controllers/TableStatusController')

// Get all TableStatuses
router.get("/", controller.getAll)

// Get TableStatus by id
router.get("/:id", controller.getById)

module.exports = router