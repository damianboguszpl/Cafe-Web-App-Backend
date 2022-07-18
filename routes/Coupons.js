const express = require('express')
const router = express.Router()
const controller = require('../controllers/CouponController')

// Get all Coupons
router.get("/", controller.getAll)

// Get Coupon by id
router.get("/:id", controller.getById)

module.exports = router