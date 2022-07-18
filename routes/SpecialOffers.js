const express = require('express')
const router = express.Router()
const controller = require('../controllers/SpecialOfferController')

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