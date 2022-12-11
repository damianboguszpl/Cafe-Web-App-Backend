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

// Get all Products with associated Special Offers
router.get("/specialoffers", controller.getAllWithSpecialOffers)

// Get all Products with associated Special Offers that have no coupons
router.get("/withoutcoupons", controller.getAllWithoutCoupons)

// Get Product by id
router.get("/:id", controller.getById)

// Get Product by name
router.get("/name/:name", controller.getByName)

// Get Products by ProductStatusId
router.get("/status/:id", controller.getByProductStatusId)

// Get Products by CategoryId
router.get("/category/:id", controller.getByCategoryId)

module.exports = router