const express = require('express')
const router = express.Router()
const controller = require('../controllers/TableController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new Table
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update Table
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.update)

// Delete Table 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all Tables
router.get("/", controller.getAll)

// Get Table by id
router.get("/:id", controller.getById)

// Get Tables by TableStatusId
router.get("/table/:id", controller.getByTableStatusId)

module.exports = router