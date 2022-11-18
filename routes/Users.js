const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

// get all Users
router.get('/', verifyJWT, controller.getAll)

// get User by id
router.get('/:id', controller.getById)

// update
// router.put("/update/:id", controller.update)  // TO DO

// // register
router.post('/register', controller.register)

// // create
router.post('/', verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update Product
router.put("/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// // login
router.post('/login', controller.login)

// // validate login
// router.get('/auth', validateToken, controller.validateToken)
// router.post('/auth', controller.auth)

// get Users by email
router.get('/email/:email', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getByEmail)

// get Users by phone
router.get('/phone/:phone', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getByPhone)

// get Users by RoleId
router.get('/role/:roleid', verifyJWT, verifyRole(ROLE_LIST.admin), controller.getByRoleId)

module.exports = router