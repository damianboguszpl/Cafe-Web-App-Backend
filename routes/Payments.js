const express = require('express')
const router = express.Router()
const controller = require('../controllers/PaymentController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /payments:
 *  post:
 *      description: Endpoint for create new payment
 *      summary: Create payment
 *      tags:
 *      - payments
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
 * /payments/update/{id}:
 *  put:
 *      description: Endpoint for update existing payment
 *      summary: Update payment
 *      tags:
 *      - payments
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
 * /payments/{id}:
 *  delete:
 *      description: Endpoint for delete existing payment
 *      summary: Delete payment
 *      tags:
 *      - payments
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
 * /payments:
 *  get:
 *      description: Endpoint for get all payments
 *      summary: Get all payments
 *      tags:
 *      - payments
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /payments/{id}:
 *  get:
 *      description: Endpoint for get payments by id
 *      summary: Get payment by id
 *      tags:
 *      - payments
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
router.get("/:id", controller.getById)

/**
 * @openapi
 * /payments/name/{name}:
 *  get:
 *      description: Endpoint for get payments by name
 *      summary: Get payment by name
 *      tags:
 *      - payments
 *      parameters:
 *          - name: name
 *            in: path
 *            required: true
 *      responses:
 *          201:
 *              description: Created
 *          404:
 *              description: Not found
 */
router.get("/name/:name", controller.getByName)

module.exports = router