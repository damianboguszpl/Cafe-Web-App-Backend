const express = require('express')
const router = express.Router()
const controller = require('../controllers/CategoryController')

// Create new Category
router.post("/", controller.create)

// Update Category
router.put("/update/:id", controller.update)

// Delete Category 
router.delete(`/:id`, controller.delete)

// Get all Categories
router.get("/", controller.getAll)

// Get Category by id
router.get("/:id", controller.getById)

// Get Category by name
router.get("/name/:name", controller.getByName)

module.exports = router