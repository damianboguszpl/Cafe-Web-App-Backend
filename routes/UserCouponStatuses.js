const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserCouponStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /usercouponstatuses:
 *  post:
 *      description: Endpoint for create new user coupon status
 *      summary: Create user coupon status
 *      tags:
 *      - usercouponstatuses
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
 * /usercouponstatuses/{id}:
 *  put:
 *      description: Endpoint for update user coupon status
 *      summary: Update user coupon status
 *      tags:
 *      - usercouponstatuses
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
router.put("/:id", verifyJWT, verifyRole(ROLE_LIST.admin), controller.update)

/**
 * @openapi
 * /usercouponstatuses/{id}:
 *  delete:
 *      description: Endpoint for delete user coupon status
 *      summary: Delete user coupon status
 *      tags:
 *      - usercouponstatuses
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
 * /usercouponstatuses:
 *  get:
 *      description: Endpoint for get all user coupon statuses
 *      summary: Get all user coupon statuses
 *      tags:
 *      - usercouponstatuses
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /usercouponstatuses/{id}:
 *  get:
 *      description: Endpoint for get user coupon status by id
 *      summary: Get user coupon status by id
 *      tags:
 *      - usercouponstatuses
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
 * /usercouponstatuses/name/{name}:
 *  get:
 *      description: Endpoint for get user coupon status by name
 *      summary: Get user coupon status by name
 *      tags:
 *      - usercouponstatuses
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