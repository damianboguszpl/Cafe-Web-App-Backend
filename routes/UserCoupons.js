const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserCouponController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new UserCoupon
router.post("/", controller.create)

// Update UserCoupon
router.put("/update/:id", controller.update)

// Delete UserCoupon 
router.delete(`/:id`, controller.delete)

// Get all UserCoupons
router.get("/", controller.getAll)

// Get UserCoupon by id
router.get("/:id", controller.getById)

// Get UserCoupons by UserId
router.get("/user/:id", controller.getByUserId)

// Get UserCoupons by CouponId
router.get("/coupon/:id", controller.getByCouponId)

module.exports = router