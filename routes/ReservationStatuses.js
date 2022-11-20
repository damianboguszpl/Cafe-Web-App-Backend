const express = require('express')
const router = express.Router()
const controller = require('../controllers/ReservationStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new ReservationStatus
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update ReservationStatus
router.put("/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// Delete ReservationStatus 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all ReservationStatuses
router.get("/", controller.getAll)

// Get ReservationStatus by id
router.get("/:id", controller.getById)

// Get ReservationStatus by name
router.get("/name/:name", controller.getByName)

module.exports = router