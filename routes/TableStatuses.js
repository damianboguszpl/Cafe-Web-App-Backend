const express = require('express')
const router = express.Router()
const controller = require('../controllers/TableStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// TODO: document
// Create new TableStatus
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update TableStatus
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// Delete TableStatus 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all TableStatuses
router.get("/", controller.getAll)

// Get TableStatus by id
router.get("/:id", controller.getById)

// Get TableStatus by name
router.get("/name/:name", controller.getByName)

module.exports = router