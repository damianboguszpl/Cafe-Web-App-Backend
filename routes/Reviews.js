const express = require('express')
const router = express.Router()
const controller = require('../controllers/ReviewController')

// Get all Reviews
router.get("/", controller.getAll)

// Get Review by id
router.get("/:id", controller.getById)

module.exports = router