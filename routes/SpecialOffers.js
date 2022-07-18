const express = require('express')
const router = express.Router()
const controller = require('../controllers/SpecialOfferController')

// Get all SpecialOffers
router.get("/", controller.getAll)

// Get SpecialOffer by id
router.get("/:id", controller.getById)

module.exports = router