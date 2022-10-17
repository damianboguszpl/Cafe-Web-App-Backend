const express = require('express')
const router = express.Router()
const controller = require('../controllers/CategoryController')
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new Category
router.post("/",verifyRole(ROLE_LIST.admin), controller.create)

// Update Category
router.put("/update/:id",verifyRole(ROLE_LIST.admin), controller.update)

// Delete Category 
router.delete(`/:id`,verifyRole(ROLE_LIST.admin), controller.delete)

// Get all Categories
router.get("/", controller.getAll)

// Get Category by id
router.get("/:id", controller.getById)

// Get Category by name
router.get("/name/:name", controller.getByName)

module.exports = router