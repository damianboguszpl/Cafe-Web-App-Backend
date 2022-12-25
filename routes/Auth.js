const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.get('/logout', AuthController.logout);

router.get('/refresh', AuthController.handleRefreshToken)

router.post('/requestpasswordreset', AuthController.request);

router.post('/resetpassword', AuthController.reset);


module.exports = router