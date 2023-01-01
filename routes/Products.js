const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /products:
 *  post:
 *      description: Endpoint for create new product
 *      summary: Create product
 *      tags:
 *      - products
 *      parameters:
 *          - name: name
 *            in: body
 *            required: true
 *          - name: size
 *            in: body
 *            required: true
 *          - name: price
 *            in: body
 *            required: true
 *          - name: CategoryId
 *            in: body
 *            required: true
 *          - name: ProductStatusId
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
 * /products/update/{id}:
 *  put:
 *      description: Endpoint for update existing product
 *      summary: Update product
 *      tags:
 *      - products
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: name
 *            in: body
 *          - name: size
 *            in: body
 *          - name: price
 *            in: body
 *          - name: CategoryId
 *            in: body
 *          - name: ProductStatusId
 *            in: body
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.put("/update/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

/**
 * @openapi
 * /products/{id}:
 *  delete:
 *      description: Endpoint for delete existing product
 *      summary: Delete product
 *      tags:
 *      - products
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 */
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

/**
 * @openapi
 * /products:
 *  get:
 *      description: Endpoint for get all products
 *      summary: Get all products
 *      tags:
 *      - products
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /products/specialoffers:
 *  get:
 *      description: Endpoint for get all Products with associated Special Offers
 *      summary: Get all products with associated Special Offers
 *      tags:
 *      - products
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/specialoffers", controller.getAllWithSpecialOffers)

/**
 * @openapi
 * /products/withoutcoupons:
 *  get:
 *      description: Endpoint for get all Products without coupons
 *      summary: Get all products without coupons
 *      tags:
 *      - products
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/withoutcoupons", controller.getAllWithoutCoupons)

/**
 * @openapi
 * /products/{id}:
 *  get:
 *      description: Endpoint for get existing product by id
 *      summary: Get product by id
 *      tags:
 *      - products
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
router.get("/:id", controller.getById)

/**
 * @openapi
 * /products/name/{name}:
 *  get:
 *      description: Endpoint for get existing product by name
 *      summary: Get product by name
 *      tags:
 *      - products
 *      parameters:
 *          - name: name
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.get("/name/:name", controller.getByName)

/**
 * @openapi
 * /products/status/{id}:
 *  get:
 *      description: Endpoint for get existing product by status id
 *      summary: Get product by status id
 *      tags:
 *      - products
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
router.get("/status/:id", controller.getByProductStatusId)

/**
 * @openapi
 * /products/category/{id}:
 *  get:
 *      description: Endpoint for get existing product by category id
 *      summary: Get product by category id
 *      tags:
 *      - products
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
router.get("/category/:id", controller.getByCategoryId)

module.exports = router