const express = require('express')
const router = express.Router()
const controller = require('../controllers/TableStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /tablestatuses:
 *  post:
 *      description: Endpoint for create new table status
 *      summary: Create table status
 *      tags:
 *      - tablestatuses
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
 * /tablestatuses/update/{id}:
 *  put:
 *      description: Endpoint for update table status
 *      summary: Update table status
 *      tags:
 *      - tablestatuses
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
 * /tablestatuses/{id}:
 *  delete:
 *      description: Endpoint for delete table status
 *      summary: Delete table status
 *      tags:
 *      - tablestatuses
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
 * /tablestatuses:
 *  get:
 *      description: Endpoint for get all table statuses
 *      summary: Get all table statuses
 *      tags:
 *      - tablestatuses
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /tablestatuses/{id}:
 *  get:
 *      description: Endpoint for get table status by id
 *      summary: Get table status by id
 *      tags:
 *      - tablestatuses
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
 * /tablestatuses/name/{name}:
 *  get:
 *      description: Endpoint for get table status by name
 *      summary: Get table status by name
 *      tags:
 *      - tablestatuses
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