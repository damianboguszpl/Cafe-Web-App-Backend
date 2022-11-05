const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderHeaderController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new OrderHeader
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.create)

// Update OrderHeader
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.update)

// Delete OrderHeader 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.delete)

// Get all OrderHeaders
router.get("/", verifyJWT, controller.getAll)

// Get OrderHeader by id
router.get("/:id", verifyJWT, controller.getById)

// Get OrderHeader by PaymentId
router.get("/product/:id", verifyJWT, controller.getByPaymentId)

// Get OrderHeader by ClientId
router.get("/client/:id", verifyJWT, controller.getByClientId)

// Get OrderHeader by EmployeeId
router.get("/employee/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getByEmployeeId)

// Get OrderHeader by OrderStatusId
router.get("/orderstatus/:id", verifyJWT, controller.getByOrderStatusId)

// Get OrderHeader by ReviewId
router.get("/review/:id", verifyJWT, controller.getByReviewId)

// Get OrderHeader by TableId
router.get("/table/:id", verifyJWT, controller.getByTableId)

module.exports = router