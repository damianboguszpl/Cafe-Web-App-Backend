const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserCouponController')

// Get all UserCoupons
router.get("/", controller.getAll)

// Get UserCoupon by id
router.get("/:id", controller.getById)

module.exports = router