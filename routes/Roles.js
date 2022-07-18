const express = require('express')
const router = express.Router()
const controller = require('../controllers/RoleController')

// Get all Roles
router.get("/", controller.getAll)

// Get Role by id
router.get("/:id", controller.getById)

module.exports = router