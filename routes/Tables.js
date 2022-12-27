const express = require('express')
const router = express.Router()
const controller = require('../controllers/TableController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /tables:
 *  post:
 *      description: Endpoint for create new table
 *      summary: Create table
 *      tags:
 *      - tables
 *      parameters:
 *          - name: numberOfSeats
 *            in: body
 *            required: true
 *          - name: number
 *            in: body
 *            required: true
 *          - name: TableStatusId
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
 * /tables/update/{id}:
 *  put:
 *      description: Endpoint for update table
 *      summary: Update table
 *      tags:
 *      - tables
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: numberOfSeats
 *            in: body
 *          - name: number
 *            in: body
 *          - name: TableStatusId
 *            in: body
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 */
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.update)

/**
 * @openapi
 * /tables/{id}:
 *  delete:
 *      description: Endpoint for delete table
 *      summary: Delete table
 *      tags:
 *      - tables
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
 * /tables:
 *  get:
 *      description: Endpoint for get all tables
 *      summary: Get all tables
 *      tags:
 *      - tables
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /tables/{id}:
 *  get:
 *      description: Endpoint for get table by id
 *      summary: Get table by id
 *      tags:
 *      - tables
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
 * /tables/table/{id}:
 *  get:
 *      description: Endpoint for get table by table status id
 *      summary: Get table by table status id
 *      tags:
 *      - tables
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
router.get("/table/:id", controller.getByTableStatusId)

module.exports = router