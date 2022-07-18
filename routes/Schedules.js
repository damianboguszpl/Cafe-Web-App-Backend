const express = require('express')
const router = express.Router()
const controller = require('../controllers/ScheduleController')

// Get all Schedules
router.get("/", controller.getAll)

// Get Schedule by id
router.get("/:id", controller.getById)

// Get Schedule by UserId
router.get("/user/:id", controller.getByUserId)

module.exports = router