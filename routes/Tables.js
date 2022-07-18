const express = require('express')
const router = express.Router()
const controller = require('../controllers/TableController')

// Get all Tables
router.get("/", controller.getAll)

// Get Table by id
router.get("/:id", controller.getById)

module.exports = router