const express = require('express')
const router = express.Router()
const controller = require('../controllers/MailerController')
const { verifyJWT } = require("../middlewares/verifyJWT")

// Send an email
router.post("/", verifyJWT, controller.send)

module.exports = router