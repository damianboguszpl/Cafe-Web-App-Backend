const express = require('express')
const router = express.Router()
const RefreshTokenController = require('../controllers/RefreshTokenController')
const { verifyJWT } = require("../middlewares/verifyJWT")

// TODO: document 
// I dont know the route of this
router.get('/', RefreshTokenController.handleRefreshToken)
module.exports = router