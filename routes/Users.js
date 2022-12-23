const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')
const { verifyUser } = require('../middlewares/verifyUser')

// login
router.post('/login', controller.login)

// register
router.post('/register', controller.register)

// create
router.post('/', verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

// Update User
router.put("/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

// Edit User
router.put("/edit/:id", verifyJWT, verifyUser, controller.edit)

// Change User's Password
router.put("/changepassword/:id", verifyJWT, verifyUser, controller.changePassword)

// get all Users
router.get('/', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getAll)

// get User by id
router.get('/:id', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee, ROLE_LIST.client), verifyUser, controller.getById)

// get User by email
// router.get('/email/:email', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getByEmail)
router.get('/email/:email', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee, ROLE_LIST.client), verifyUser, controller.getByEmail)

// get User by phone
router.get('/phone/:phone', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getByPhone)

// get Users by RoleId
router.get('/role/:roleid', verifyJWT, verifyRole(ROLE_LIST.admin), controller.getByRoleId)

module.exports = router