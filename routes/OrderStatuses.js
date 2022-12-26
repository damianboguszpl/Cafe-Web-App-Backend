const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /orderstatuses:
 *  post:
 *      description: Endpoint for create new order status
 *      summary: Create order status
 *      tags:
 *      - orderstatuses
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
 * /orderstatuses/update/{id}:
 *  put:
 *      description: Endpoint for update order status
 *      summary: Update order status
 *      tags:
 *      - orderstatuses
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
 * /orderstatuses/{id}:
 *  delete:
 *      description: Endpoint for delete order status
 *      summary: Delete order status
 *      tags:
 *      - orderstatuses
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 */
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

/**
 * @openapi
 * /orderstatuses:
 *  get:
 *      description: Endpoint for get all order status
 *      summary: Get all order status
 *      tags:
 *      - orderstatuses
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /orderstatuses/{id}:
 *  get:
 *      description: Endpoint for get order status by id
 *      summary: Get order status by id
 *      tags:
 *      - orderstatuses
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
 * /orderstatuses/name/{name}:
 *  get:
 *      description: Endpoint for get order status by name
 *      summary: Get order status by name
 *      tags:
 *      - orderstatuses
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