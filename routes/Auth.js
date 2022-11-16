const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

// 
router.post('/request', AuthController.request);

router.post('/reset', AuthController.reset);


module.exports = router