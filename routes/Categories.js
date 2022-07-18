const express = require('express')
const router = express.Router()
const controller = require('../controllers/CategoryController')

// Get all Categories
router.get("/", controller.getAll)

// Get Category by id
router.get("/:id", controller.getById)

module.exports = router