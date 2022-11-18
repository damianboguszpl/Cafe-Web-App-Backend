const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const RefreshTokenController = require('../controllers/RefreshTokenController')


router.get('/logout', AuthController.logout);

router.get('/refresh', RefreshTokenController.handleRefreshToken)

router.post('/requestpasswordreset', AuthController.request);

router.post('/resetpassword', AuthController.reset);


module.exports = router