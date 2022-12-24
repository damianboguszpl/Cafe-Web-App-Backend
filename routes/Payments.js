const express = require('express')
const router = express.Router()
const controller = require('../controllers/PaymentController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// TODO: document
// Create new Payment
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update Payment
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// Delete Payment 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all Payments
router.get("/", controller.getAll)

// Get Payment by id
router.get("/:id", controller.getById)

// Get Payment by name
router.get("/name/:name", controller.getByName)

module.exports = router