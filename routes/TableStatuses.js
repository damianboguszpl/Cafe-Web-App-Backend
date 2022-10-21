const express = require('express')
const router = express.Router()
const controller = require('../controllers/TableStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new TableStatus
router.post("/", controller.create)

// Update TableStatus
router.put("/update/:id", controller.update)

// Delete TableStatus 
router.delete(`/:id`, controller.delete)

// Get all TableStatuses
router.get("/", controller.getAll)

// Get TableStatus by id
router.get("/:id", controller.getById)

// Get TableStatus by name
router.get("/name/:name", controller.getByName)

module.exports = router