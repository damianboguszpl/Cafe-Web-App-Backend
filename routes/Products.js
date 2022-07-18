const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductController')

// Get all Products
router.get("/", controller.getAll)

// Get Product by id
router.get("/:id", controller.getById)

// Get Product by name
router.get("/name/:name", controller.getByName)

// Get available Products
router.get("/available", controller.getAvailable)

// Get unavailable Products
router.get("/unavailable", controller.getUnavailable)

// Get Products by ProductStatusId
router.get("/status/:id", controller.getByProductStatusId)

// Get Products by CategoryId
router.get("/category/:id", controller.getByCategoryId)

module.exports = router