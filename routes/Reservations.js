const express = require('express')
const router = express.Router()
const controller = require('../controllers/ReservationController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new Reservation
router.post("/", verifyJWT, controller.create)

// Update Reservation
router.put("/:id", verifyJWT, controller.update)

// Delete Reservation 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all Reservations
router.get("/", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getAll)

// Get Reservation by id
router.get("/:id", verifyJWT, controller.getById)

// Get Reservation by ClientId
router.get("/client/:id", verifyJWT, controller.getByClientId)

// Get Reservation by EmployeeId
router.get("/employee/:id", verifyJWT, controller.getByEmployeeId)

// Get Reservation by ReservationStatusId
router.get("/reservationstatus/:id", verifyJWT, controller.getByReservationStatusId)

// Get Reservation by TableId
router.get("/table/:id", verifyJWT, controller.getByTableId)

module.exports = router