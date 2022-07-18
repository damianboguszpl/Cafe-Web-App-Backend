const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductController')

// Get all Products
router.get("/", controller.getAll)

// Get Product by id
router.get("/:id", controller.getById)

module.exports = router