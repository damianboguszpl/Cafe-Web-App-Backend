const express = require('express')
const router = express.Router()
const controller = require('../controllers/ScheduleController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new Schedule
router.post("/", controller.create)

// Update Schedule
router.put("/update/:id", controller.update)

// Delete Schedule 
router.delete(`/:id`, controller.delete)

// Get all Schedules
router.get("/", controller.getAll)

// Get Schedule by id
router.get("/:id", controller.getById)

// Get Schedule by UserId
router.get("/user/:id", controller.getByUserId)

module.exports = router