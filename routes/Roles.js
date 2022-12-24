const express = require('express')
const router = express.Router()
const controller = require('../controllers/RoleController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// TODO: document
// Create new Role
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update Role
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// Delete Role 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all Roles
router.get("/", controller.getAll)

// Get Role by id
router.get("/:id", controller.getById)

// Get Role by name
router.get("/name/:name", controller.getByName)

module.exports = router