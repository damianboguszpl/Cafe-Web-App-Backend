const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserController')
// const { validateToken } = require("../middlewares/AuthMiddleware")

// get all Users
router.get('/', controller.getAll)

// // register
// router.post('/register', controller.register)

// // login
// router.post('/login', controller.login)

// // validate login
// router.get('/auth',validateToken, controller.validateToken)

// get Users by id
router.get('/:id', controller.getById)

// // get Users by email
// router.get('/email/:email', controller.getByEmail)

module.exports = router