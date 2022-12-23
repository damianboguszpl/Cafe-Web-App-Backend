const express = require('express')
const router = express.Router()
const controller = require('../controllers/CouponController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new Coupon
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update Coupon
router.put("/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// Delete Coupon 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all Coupons
router.get("/", controller.getAll)

// Get Coupon by id
router.get("/:id", controller.getById)

// Get Coupon by name
// router.get("/name/:name", controller.getByName)

// Get Coupon by ProductId
router.get("/product/:id", controller.getByProductId)

// Get available Coupons
router.get("/status/available", controller.getAvailable)

// Get unavailable Coupons
router.get("/status/unavailable", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getUnavailable)

module.exports = router