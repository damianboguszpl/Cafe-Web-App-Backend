const express = require('express')
const router = express.Router()
const controller = require('../controllers/RoleController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /roles:
 *  post:
 *      description: Endpoint for create new role
 *      summary: Create role
 *      tags:
 *      - roles
 *      parameters:
 *          - name: name
 *            in: body
 *            required: true
 *      responses:
 *          201:
 *              description: Created
 *          400:
 *              description: Bad request
 */
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

/**
 * @openapi
 * /roles/update/{id}:
 *  put:
 *      description: Endpoint for update role
 *      summary: Update role
 *      tags:
 *      - roles
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: name
 *            in: body
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 */
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

/**
 * @openapi
 * /roles/{id}:
 *  delete:
 *      description: Endpoint for delete role
 *      summary: Delete role
 *      tags:
 *      - roles
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

/**
 * @openapi
 * /roles:
 *  get:
 *      description: Endpoint for get all roles
 *      summary: Get all roles
 *      tags:
 *      - roles
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /roles/{id}:
 *  get:
 *      description: Endpoint for get role by id
 *      summary: Get role by id
 *      tags:
 *      - roles
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/:id", controller.getById)

/**
 * @openapi
 * /roles/name/{name}:
 *  get:
 *      description: Endpoint for get role by name
 *      summary: Get role by name
 *      tags:
 *      - roles
 *      parameters:
 *          - name: name
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/name/:name", controller.getByName)

module.exports = router