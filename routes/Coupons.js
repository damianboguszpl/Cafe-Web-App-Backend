const express = require('express')
const router = express.Router()
const controller = require('../controllers/CouponController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /coupons:
 *  post:
 *      description: Endpoint for create coupon
 *      summary: Create coupon
 *      tags:
 *      - coupons
 *      parameters:
 *          - name: name
 *            in: body
 *          - name: value
 *            in: body
 *          - name: pointPrice
 *            in: body
 *          - name: isAvailable
 *            in: body
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
router.post("/", verifyJWT, verifyRole(ROLE_LIST.admin), controller.create)

/**
 * @openapi
 * /coupons/{id}:
 *  put:
 *      description: Endpoint for update existing coupon
 *      summary: Update coupon
 *      tags:
 *      - coupons
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: value
 *            in: body
 *          - name: pointPrice
 *            in: body
 *          - name: isAvailable
 *            in: body
 *          - name: ProductId
 *            in: body
 *      responses:
 *          201:
 *              description: Created
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 */
router.put("/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

/**
 * @openapi
 * /coupons/{id}:
 *  delete:
 *      description: Endpoint for delete existing coupon
 *      summary: Delete coupon
 *      tags:
 *      - coupons
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
 * /coupons:
 *  get:
 *      description: Endpoint for get all coupons
 *      summary: Get all coupon
 *      tags:
 *      - coupons
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /coupons/{id}:
 *  get:
 *      description: Endpoint for get coupon by id
 *      summary: Get coupon by id
 *      tags:
 *      - coupons
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

// Get Coupon by name
// router.get("/name/:name", controller.getByName)

/**
 * @openapi
 * /coupons/product/{id}:
 *  get:
 *      description: Endpoint for get coupon by product id
 *      summary: Get coupon by product id
 *      tags:
 *      - coupons
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

/**
 * @openapi
 * /coupons/status/available:
 *  get:
 *      description: Endpoint for get all available coupons
 *      summary: Get available coupons
 *      tags:
 *      - coupons
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/status/available", controller.getAvailable)

/**
 * @openapi
 * /coupons/status/unavailable:
 *  get:
 *      description: Endpoint for get all unavailable coupons
 *      summary: Get unavailable coupons
 *      tags:
 *      - coupons
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/status/unavailable", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getUnavailable)

module.exports = router