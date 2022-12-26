const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserCouponController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')
const { verifyUser } = require('../middlewares/verifyUser')

/**
 * @openapi
 * /usercoupons:
 *  post:
 *      description: Endpoint for create new user coupon
 *      summary: Create user coupon
 *      tags:
 *      - usercoupons
 *      parameters:
 *          - name: CouponId
 *            in: body
 *            required: true
 *          - name: UserId
 *            in: body
 *            required: true
 *          - name: UserCouponStatusId
 *            in: body
 *            required: true
 *          - name: expiration_date
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
router.post("/", verifyJWT, controller.create)

/**
 * @openapi
 * /usercoupons/{id}:
 *  put:
 *      description: Endpoint for update user coupon
 *      summary: Update user coupon
 *      tags:
 *      - usercoupons
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: CouponId
 *            in: body
 *          - name: UserId
 *            in: body
 *          - name: UserCouponStatusId
 *            in: body
 *          - name: expiration_date
 *            in: body
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 */
router.put("/:id", verifyJWT, verifyRole(ROLE_LIST.employee, ROLE_LIST.admin), controller.update)

/**
 * @openapi
 * /usercoupons/{id}:
 *  delete:
 *      description: Endpoint for delete user coupon
 *      summary: Delete user coupon
 *      tags:
 *      - usercoupons
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
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.employee, ROLE_LIST.admin), controller.delete)

/**
 * @openapi
 * /usercoupons:
 *  get:
 *      description: Endpoint for get all user coupons
 *      summary: Get all user coupons
 *      tags:
 *      - usercoupons
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", verifyJWT, verifyRole(ROLE_LIST.employee, ROLE_LIST.admin), controller.getAll)

/**
 * @openapi
 * /usercoupons/{id}:
 *  get:
 *      description: Endpoint for get user coupon by id
 *      summary: Get user coupon by id
 *      tags:
 *      - usercoupons
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
 * /usercoupons/code{code}:
 *  get:
 *      description: Endpoint for get user coupon by code
 *      summary: Get user coupon by code
 *      tags:
 *      - usercoupons
 *      parameters:
 *          - name: code
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/code/:code", verifyJWT, controller.getByCode)

/**
 * @openapi
 * /usercoupons/user/{id}:
 *  get:
 *      description: Endpoint for get user coupon by user id
 *      summary: Get user coupon by user id
 *      tags:
 *      - usercoupons
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
router.get("/user/:id", verifyJWT, verifyUser, controller.getByUserId)

/**
 * @openapi
 * /usercoupons/coupon/{id}:
 *  get:
 *      description: Endpoint for get user coupon by coupon id
 *      summary: Get user coupon by coupon id
 *      tags:
 *      - usercoupons
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
router.get("/coupon/:id", verifyJWT, verifyRole(ROLE_LIST.employee, ROLE_LIST.admin), controller.getByCouponId)

/**
 * @openapi
 * /usercoupons/couponstatus/{id}:
 *  get:
 *      description: Endpoint for get user coupon by coupon status id
 *      summary: Get user coupon by coupon status id
 *      tags:
 *      - usercoupons
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
router.get("/couponstatus/:id", controller.getByUserCouponStatusId)

module.exports = router