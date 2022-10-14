const express = require('express')
const router = express.Router()
const RefreshTokenController = require('../controllers/RefreshTokenController')
 const { verifyJWT } = require("../middlewares/verifyJWT")

// 
router.get('/', RefreshTokenController.handleRefreshToken)



module.exports = router