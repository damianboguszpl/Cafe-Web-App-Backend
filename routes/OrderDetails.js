const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderDetailsController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /orderdetails:
 *  post:
 *      description: Endpoint for create new order details
 *      summary: Create order details
 *      tags:
 *      - orderdetails
 *      parameters:
 *          - name: transaction_price
 *            in: body
 *            required: true
 *          - name: quantity
 *            in: body
 *            required: true
 *          - name: OrderHeaderId
 *            in: body
 *            required: true
 *          - name: ProductId
 *            in: body
 *            required: true
 *      responses:
 *          201:
 *              description: Created
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 */
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.create)

/**
 * @openapi
 * /orderdetails/update/{id}:
 *  put:
 *      description: Endpoint for update order details
 *      summary: Update order details
 *      tags:
 *      - orderdetails
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: transaction_price
 *            in: body
 *          - name: quantity
 *            in: body
 *          - name: OrderHeaderId
 *            in: body
 *          - name: ProductId
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
 * /orderdetails/{id}:
 *  delete:
 *      description: Endpoint for delete order details
 *      summary: Delete order details
 *      tags:
 *      - orderdetails
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      responses:
 *          201:
 *              description: Created
 *          404:
 *              description: Not found
 */
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.delete)

/**
 * @openapi
 * /orderdetails:
 *  get:
 *      description: Endpoint for get all order details
 *      summary: Get all order details
 *      tags:
 *      - orderdetails
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", verifyJWT, controller.getAll)

/**
 * @openapi
 * /orderdetails/{id}:
 *  get:
 *      description: Endpoint for get order details by id
 *      summary: Get order details by id
 *      tags:
 *      - orderdetails
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
router.get("/:id", verifyJWT, controller.getById)

/**
 * @openapi
 * /orderdetails/product/{id}:
 *  get:
 *      description: Endpoint for get order details by product id
 *      summary: Get order details by product id
 *      tags:
 *      - orderdetails
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
router.get("/product/:id", verifyJWT, controller.getByProductId)

/**
 * @openapi
 * /orderdetails/orderheader/{id}:
 *  get:
 *      description: Endpoint for get order details by order header id
 *      summary: Get order details by order header id
 *      tags:
 *      - orderdetails
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
router.get("/orderheader/:id", verifyJWT, controller.getByOrderHeaderId)

module.exports = router