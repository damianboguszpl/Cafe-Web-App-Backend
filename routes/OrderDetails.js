const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderDetailsController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new OrderDetails
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.create)

// Update OrderDetails
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.update)

// Delete OrderDetails 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.delete)

// Get all OrderDetails
router.get("/", verifyJWT, controller.getAll)

// Get OrderDetails by id
router.get("/:id", verifyJWT, controller.getById)

// Get OrderDetails by ProductId
router.get("/product/:id", verifyJWT, controller.getByProductId)

// Get OrderDetails by OrderHeaderId
router.get("/orderheader/:id", verifyJWT, controller.getByOrderHeaderId)

module.exports = router