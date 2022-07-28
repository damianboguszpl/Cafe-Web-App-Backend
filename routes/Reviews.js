const express = require('express')
const router = express.Router()
const controller = require('../controllers/ReviewController')

// Create new Review
router.post("/", controller.create)

// Update Review
router.put("/update/:id", controller.update)

// Delete Review 
router.delete(`/:id`, controller.delete)

// Get all Reviews
router.get("/", controller.getAll)

// Get Review by id
router.get("/:id", controller.getById)

module.exports = router