const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserCouponController')

// Get all UserCoupons
router.get("/", controller.getAll)

// Get UserCoupon by id
router.get("/:id", controller.getById)

// Get UserCoupons by UserId
router.get("/user/:id", controller.getByUserId)

// Get UserCoupons by CouponId
router.get("/coupon/:id", controller.getByCouponId)

module.exports = router