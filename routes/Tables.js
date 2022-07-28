const express = require('express')
const router = express.Router()
const controller = require('../controllers/TableController')

// Create new Table
router.post("/", controller.create)

// Update Table
router.put("/update/:id", controller.update)

// Delete Table 
router.delete(`/:id`, controller.delete)

// Get all Tables
router.get("/", controller.getAll)

// Get Table by id
router.get("/:id", controller.getById)

// Get Tables by TableStatusId
router.get("/product/:id", controller.getByTableStatusId)

module.exports = router