const express = require('express')
const router = express.Router()
const controller = require('../controllers/SpecialOfferController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// Create new SpecialOffer
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update SpecialOffer
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// Delete SpecialOffer 
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

// Get all SpecialOffers
router.get("/", controller.getAll)

// Get SpecialOffer by id
router.get("/:id", controller.getById)

// Get SpecialOffers by ProductId
router.get("/product/:id", controller.getByProductId)

module.exports = router