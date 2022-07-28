const express = require('express')
const router = express.Router()
const controller = require('../controllers/SpecialOfferController')

// Create new SpecialOffer
router.post("/", controller.create)

// Update SpecialOffer
router.put("/update/:id", controller.update)

// Delete SpecialOffer 
router.delete(`/:id`, controller.delete)

// Get all SpecialOffers
router.get("/", controller.getAll)

// Get SpecialOffer by id
router.get("/:id", controller.getById)

// Get SpecialOffers by ProductId
router.get("/product/:id", controller.getByProductId)

// Get available SpecialOffers
router.get("/available", controller.getAvailable)

// Get unavailable SpecialOffers
router.get("/unavailable", controller.getUnavailable)

module.exports = router