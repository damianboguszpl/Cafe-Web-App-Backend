const express = require('express')
const router = express.Router()
const controller = require('../controllers/CouponController')

// Get all Coupons
router.get("/", controller.getAll)

// Get Coupon by id
router.get("/:id", controller.getById)

// Get Coupon by name
router.get("/name/:name", controller.getByName)

// Get Coupon by ProductId
router.get("/product/:id", controller.getByProductId)

// Get available Coupons
router.get("/available", controller.getAvailable)

// Get unavailable Coupons
router.get("/unavailable", controller.getUnavailable)

module.exports = router