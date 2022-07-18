const express = require('express')
const router = express.Router()
const controller = require('../controllers/CategoryController')

// Get all Categories
router.get("/", controller.getAll)

// Get Category by id
router.get("/:id", controller.getById)

// Get Category by name
router.get("/name/:name", controller.getByName)

module.exports = router