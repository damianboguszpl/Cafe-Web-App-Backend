const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new OrderStatus
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update OrderStatus
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// Delete OrderStatus 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all OrderStatuses
router.get("/", verifyJWT, controller.getAll)

// Get OrderStatus by id
router.get("/:id", verifyJWT, controller.getById)

// Get OrderStatus by name
router.get("/name/:name", verifyJWT, controller.getByName)

module.exports = router