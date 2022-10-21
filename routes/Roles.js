const express = require('express')
const router = express.Router()
const controller = require('../controllers/RoleController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new Role
router.post("/", controller.create)

// Update Role
router.put("/update/:id", controller.update)

// Delete Role 
router.delete(`/:id`, controller.delete)

// Get all Roles
router.get("/",/*verifyJWT,*/ controller.getAll)

// Get Role by id
router.get("/:id", controller.getById)

// Get Role by name
router.get("/name/:name", controller.getByName)

module.exports = router