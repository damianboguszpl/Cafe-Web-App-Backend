const express = require('express')
const router = express.Router()
const controller = require('../controllers/ReservationStatusController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /reservationstatuses:
 *  post:
 *      description: Endpoint for create reservation status
 *      summary: Create reservation status
 *      tags:
 *      - reservationstatuses
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
 * /reservationstatuses/{id}:
 *  put:
 *      description: Endpoint for update reservation status
 *      summary: Update reservation status
 *      tags:
 *      - reservationstatuses
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
 * /reservationstatuses/{id}:
 *  delete:
 *      description: Endpoint for delete reservation status
 *      summary: Delete reservation status
 *      tags:
 *      - reservationstatuses
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
 * /reservationstatuses:
 *  get:
 *      description: Endpoint for get all reservation statuses
 *      summary: Get all reservation statuses
 *      tags:
 *      - reservationstatuses
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /reservationstatuses/{id}:
 *  get:
 *      description: Endpoint for get reservation status by id
 *      summary: Get reservation status by id
 *      tags:
 *      - reservationstatuses
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
 * /reservationstatuses/name/{name}:
 *  get:
 *      description: Endpoint for get reservation status by name
 *      summary: Get reservation status by name
 *      tags:
 *      - reservationstatuses
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