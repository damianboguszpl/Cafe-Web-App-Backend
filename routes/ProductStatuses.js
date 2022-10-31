const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new ProductStatus
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update ProductStatus
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// Delete ProductStatus 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all ProductStatuses
router.get("/", controller.getAll)

// Get ProductStatus by id
router.get("/:id", controller.getById)

// Get ProductStatus by name
router.get("/name/:name", controller.getByName)

module.exports = router