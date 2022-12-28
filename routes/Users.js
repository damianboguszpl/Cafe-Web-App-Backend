const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const { verifyUser } = require('../middlewares/verifyUser')
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /users/login:
 *  post:
 *    description: Endpoint for login
 *    summary: Login
 *    tags:
 *      - users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object 
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *        200:
 *            description: Ok
 *        400:
 *            description: Bad request
 */
router.post('/login', controller.login)

/**
 * @openapi
 * /users/register:
 *  post:
 *    description: Endpoint for register
 *    summary: Register
 *    tags:
 *      - users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object 
 *            required:
 *              - email
 *              - password
 *              - firstname
 *              - lastname
 *              - phoneNumber
 *              - sex
 *            properties:   
 *              email:
 *                type: string
 *              firstname:
 *                type: string
 *              password:
 *                type: string
 *              lastname:
 *                type: string
 *              phoneNumber:
 *                type: integer
 *              sex:
 *                type: string
 *    responses:
 *        200:
 *            description: Ok
 *        400:
 *            description: Bad request
 *        404:
 *            description: Not found
 */
router.post('/register', controller.register)

/**
 * @openapi
 * /users:
 *  post:
 *    description: Endpoint for create new user
 *    summary: Create user e.g. Employee
 *    tags:
 *      - users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object 
 *            required:
 *              - email
 *              - password
 *              - firstname
 *              - lastname
 *              - phoneNumber
 *              - sex
 *              - RoleId
 *            properties:   
 *              email:
 *                type: string
 *              firstname:
 *                type: string
 *              password:
 *                type: string
 *              lastname:
 *                type: string
 *              phoneNumber:
 *                type: integer
 *              sex:
 *                type: string
 *              RoleId:
 *                type: integer
 *    responses:
 *        200:
 *            description: Ok
 *        400:
 *            description: Bad request
 *        404:
 *            description: Not found
 */
router.post('/', verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

/**
 * @openapi
 * /users/{id}:
 *  put:
 *      description: Endpoint for update existing user
 *      summary: Update user by admin
 *      tags:
 *      - users
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: firstname
 *            in: body
 *          - name: lastname
 *            in: body
 *          - name: phone
 *            in: body
 *          - name: sex
 *            in: body
 *          - name: RoleId
 *            in: body
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 */
router.put("/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

/**
 * @openapi
 * /users/edit/{id}:
 *  put:
 *      description: Endpoint for update existing user
 *      summary: Update user
 *      tags:
 *      - users
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: firstname
 *            in: body
 *          - name: lastname
 *            in: body
 *          - name: phone
 *            in: body
 *          - name: sex
 *            in: body
 *          - name: RoleId
 *            in: body
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 */
router.put("/edit/:id", verifyJWT, verifyUser, controller.edit)

/**
 * @openapi
 * /users/changepassword/{id}:
 *  put:
 *      description: Endpoint for change password
 *      summary: Change password
 *      tags:
 *      - users
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: password
 *            in: body
 *            required: true
 *          - name: newPassword
 *            in: body
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.put("/changepassword/:id", verifyJWT, verifyUser, controller.changePassword)

/**
 * @openapi
 * /users:
 *  get:
 *      description: Endpoint for get all users
 *      summary: Get all users
 *      tags:
 *      - users
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 */
router.get('/', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getAll)

/**
 * @openapi
 * /users/{id}:
 *  get:
 *      description: Endpoint for get user by id
 *      summary: Get user by id
 *      tags:
 *      - users
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.get('/:id', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee, ROLE_LIST.client), verifyUser, controller.getById)

/**
 * @openapi
 * /users/email/{email}:
 *  get:
 *      description: Endpoint for get user by email
 *      summary: Get user by email
 *      tags:
 *      - users
 *      parameters:
 *          - name: email
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.get('/email/:email', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee, ROLE_LIST.client), verifyUser, controller.getByEmail)

/**
 * @openapi
 * /users/phone/{phone}:
 *  get:
 *      description: Endpoint for get user by phone number
 *      summary: Get user by phone
 *      tags:
 *      - users
 *      parameters:
 *          - name: phone
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.get('/phone/:phone', verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getByPhone)

/**
 * @openapi
 * /users/role/{roleid}:
 *  get:
 *      description: Endpoint for get user by phone number
 *      summary: Get user by phone
 *      tags:
 *      - users
 *      parameters:
 *          - name: roleid
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.get('/role/:roleid', verifyJWT, verifyRole(ROLE_LIST.admin), controller.getByRoleId)

module.exports = router