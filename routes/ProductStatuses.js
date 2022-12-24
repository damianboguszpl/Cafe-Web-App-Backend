const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /productstatuses:
 *  post:
 *      description: Endpoint for create new product status
 *      summary: Create product status
 *      tags:
 *      - productstatuses
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
 * /productstatuses/update/{id}:
 *  put:
 *      description: Endpoint for update product status
 *      summary: Update product status
 *      tags:
 *      - productstatuses
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
 */
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

/**
 * @openapi
 * /productstatuses/{id}:
 *  delete:
 *      description: Endpoint for delete product status
 *      summary: Delete product status
 *      tags:
 *      - productstatuses
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
 * /productstatuses:
 *  get:
 *      description: Endpoint for get all product status
 *      summary: Get all product status
 *      tags:
 *      - productstatuses
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /productstatuses/{id}:
 *  get:
 *      description: Endpoint for get product status by id
 *      summary: Get product status by id
 *      tags:
 *      - productstatuses
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
 * /productstatuses/name/{name}:
 *  get:
 *      description: Endpoint for get product status by name
 *      summary: Get product status by name
 *      tags:
 *      - productstatuses
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