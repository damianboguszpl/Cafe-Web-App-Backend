const express = require('express')
const router = express.Router()
const controller = require('../controllers/OrderHeaderController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const { verifyUser } = require('../middlewares/verifyUser')
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /orderheaders:
 *  post:
 *      description: Endpoint for create new order headers
 *      summary: Create order headers
 *      tags:
 *      - orderheaders
 *      parameters:
 *          - name: final_price
 *            in: body
 *          - name: PaymentId
 *            in: body
 *          - name: OrderStatusId
 *            in: body
 *          - name: TableId
 *            in: body
 *          - name: ClientId
 *            in: body
 *          - name: EmployeeId
 *            in: body
 *      responses:
 *          201:
 *              description: Created
 */
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.create)

/**
 * @openapi
 * /orderheaders/update/{id}:
 *  put:
 *      description: Endpoint for update order headers
 *      summary: Update order headers
 *      tags:
 *      - orderheaders
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: final_price
 *            in: body
 *          - name: PaymentId
 *            in: body
 *          - name: OrderStatusId
 *            in: body
 *          - name: TableId
 *            in: body
 *          - name: ClientId
 *            in: body
 *          - name: EmployeeId
 *            in: body
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.update)

/**
 * @openapi
 * /orderheaders/{id}:
 *  delete:
 *      description: Endpoint for delete order headers
 *      summary: Delete order headers
 *      tags:
 *      - orderheaders
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
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.delete)

/**
 * @openapi
 * /orderheaders:
 *  get:
 *      description: Endpoint for get all order headers
 *      summary: Get all order headers
 *      tags:
 *      - orderheaders
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getAll)

/**
 * @openapi
 * /orderheaders/{id}:
 *  get:
 *      description: Endpoint for get order headers by id
 *      summary: Get order header by id
 *      tags:
 *      - orderheaders
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
 * /orderheaders/product/{id}:
 *  get:
 *      description: Endpoint for get order headers by product id
 *      summary: Get order header by product id
 *      tags:
 *      - orderheaders
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
router.get("/product/:id", verifyJWT, controller.getByPaymentId)

/**
 * @openapi
 * /orderheaders/client/{id}:
 *  get:
 *      description: Endpoint for get order headers by client id
 *      summary: Get order header by client id
 *      tags:
 *      - orderheaders
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
router.get("/client/:id", verifyJWT, verifyUser, controller.getByClientId)

/**
 * @openapi
 * /orderheaders/employee/{id}:
 *  get:
 *      description: Endpoint for get order headers by employee id
 *      summary: Get order header by employee id
 *      tags:
 *      - orderheaders
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
router.get("/employee/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getByEmployeeId)

/**
 * @openapi
 * /orderheaders/orderstatus/{id}:
 *  get:
 *      description: Endpoint for get order headers by order status id
 *      summary: Get order header by order status id
 *      tags:
 *      - orderheaders
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
router.get("/orderstatus/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getByOrderStatusId)

/**
 * @openapi
 * /orderheaders/table/{id}:
 *  get:
 *      description: Endpoint for get order headers by table id
 *      summary: Get order header by table id
 *      tags:
 *      - orderheaders
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
router.get("/table/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getByTableId)

module.exports = router