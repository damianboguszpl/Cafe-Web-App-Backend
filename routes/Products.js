const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new Product
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update Product
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.update)

// Delete Product 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all Products
router.get("/", controller.getAll)

// Get Product by id
router.get("/:id", controller.getById)

// Get Product by name
router.get("/name/:name", controller.getByName)

// Get available Products
router.get("/available", controller.getAvailable)

// Get unavailable Products
router.get("/unavailable", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getUnavailable)

// Get Products by ProductStatusId
router.get("/status/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.getByProductStatusId)

// Get Products by CategoryId
router.get("/category/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.getByCategoryId)

module.exports = router