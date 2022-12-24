const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserCouponStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// TODO: document
// Create new UserCouponStatus
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update UserCouponStatus
router.put("/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// Delete UserCouponStatus 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all UserCouponStatuses
router.get("/", controller.getAll)

// Get UserCouponStatus by id
router.get("/:id", controller.getById)

// Get UserCouponStatus by name
router.get("/name/:name", controller.getByName)

module.exports = router