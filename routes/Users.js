const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserController')
// const { validateToken } = require("../middlewares/AuthMiddleware")

// get all Users
router.get('/', controller.getAll)

// get User by id
router.get('/:id', controller.getById)

// // register
// router.post('/register', controller.register)

// // login
// router.post('/login', controller.login)

// // validate login
// router.get('/auth', validateToken, controller.validateToken)
// router.post('/auth',verifyJWT, controller.validateToken)

// get Users by email
router.get('/email/:email', controller.getByEmail)

// get Users by phone
router.get('/phone/:phone', controller.getByPhone)

// get Users by RoleId
router.get('/role/:id', controller.getByRoleId)

module.exports = router