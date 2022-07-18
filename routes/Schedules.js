const express = require('express')
const router = express.Router()
const controller = require('../controllers/ScheduleController')

// Get all Schedules
router.get("/", controller.getAll)

// Get Schedule by id
router.get("/:id", controller.getById)

module.exports = router