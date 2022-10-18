const express = require('express')
const router = express.Router()
const controller = require('../controllers/CategoryController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new Category
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update Category
router.put("/update/:id", verifyRole(ROLE_LIST.admin), controller.update)

// Delete Category 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all Categories
router.get("/", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getAll)

// Get Category by id
router.get("/:id",  verifyJWT, controller.getById)

// Get Category by name
router.get("/name/:name", controller.getByName)

module.exports = router