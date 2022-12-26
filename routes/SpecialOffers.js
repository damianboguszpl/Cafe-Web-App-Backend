const express = require('express')
const router = express.Router()
const controller = require('../controllers/SpecialOfferController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /specialoffers:
 *  post:
 *      description: Endpoint for create new special offer
 *      summary: Create special offer
 *      tags:
 *      - specialoffers
 *      parameters:
 *          - name: value
 *            in: body
 *            required: true
 *          - name: start_date
 *            in: body
 *            required: true
 *          - name: end_date
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
 */
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

/**
 * @openapi
 * /specialoffers/update/{id}:
 *  put:
 *      description: Endpoint for update special offer
 *      summary: Update special offer
 *      tags:
 *      - specialoffers
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: value
 *            in: body
 *          - name: start_date
 *            in: body
 *          - name: end_date
 *            in: body
 *      responses:
 *          200:
 *              description: Ok
 */
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

/**
 * @openapi
 * /specialoffers/{id}:
 *  delete:
 *      description: Endpoint for delete special offer
 *      summary: Delete special offer
 *      tags:
 *      - specialoffers
 *      parameters:
 *          - name: id
 *            in: path
 *      responses:
 *          200:
 *              description: Ok
 */
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

/**
 * @openapi
 * /specialoffers:
 *  get:
 *      description: Endpoint for get all special offers
 *      summary: Get all special offers
 *      tags:
 *      - specialoffers
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /specialoffers/{id}:
 *  get:
 *      description: Endpoint for get special offer by id
 *      summary: Get special offer by id
 *      tags:
 *      - specialoffers
 *      parameters:
 *          - name: id
 *            in: path
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/:id", controller.getById)

/**
 * @openapi
 * /specialoffers/product/{id}:
 *  get:
 *      description: Endpoint for get role by name
 *      summary: Get role by name
 *      tags:
 *      - specialoffers
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
router.get("/product/:id", controller.getByProductId)

module.exports = router