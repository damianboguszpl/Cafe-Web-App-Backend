const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserCouponController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new UserCoupon
router.post("/", verifyJWT, controller.create)

// Update UserCoupon
router.put("/:id", verifyJWT, verifyRole(ROLE_LIST.employee, ROLE_LIST.admin), controller.update)

// Delete UserCoupon 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.employee, ROLE_LIST.admin), controller.delete)

// Get all UserCoupons
router.get("/", controller.getAll)

// Get UserCoupon by id
router.get("/:id", controller.getById)

// Get UserCoupon by code
router.get("/code/:code", controller.getByCode)

// Get UserCoupons by UserId
router.get("/user/:id", controller.getByUserId)

// Get UserCoupons by CouponId
router.get("/coupon/:id", controller.getByCouponId)

// Get UserCoupons by UserCouponStatusId
router.get("/couponstatus/:id", controller.getByUserCouponStatusId)

module.exports = router