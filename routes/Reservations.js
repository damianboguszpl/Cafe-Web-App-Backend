const express = require('express')
const router = express.Router()
const controller = require('../controllers/ReservationController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')
const { verifyUser } = require('../middlewares/verifyUser')

/**
 * @openapi
 * /reservations:
 *  post:
 *      description: Endpoint for create new reservations
 *      summary: Create reservation
 *      tags:
 *      - reservations
 *      parameters:
 *          - name: date
 *            in: body
 *            required: true
 *          - name: ReservationStatusId
 *            in: body
 *            required: true
 *          - name: TableId
 *            in: body
 *            required: true
 *          - name: ClientId
 *            in: body
 *            required: true
 *          - name: EmployeeId
 *            in: body
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
 * /reservations/{id}:
 *  put:
 *      description: Endpoint for update reservation
 *      summary: Update  reservation
 *      tags:
 *      - reservations
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          - name: date
 *            in: body
 *          - name: ReservationStatusId
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
 *          400:
 *              description: Bad request
 *          404:
 *              description: Not found
 */
router.put("/:id", verifyJWT, controller.update)

/**
 * @openapi
 * /reservations/{id}:
 *  delete:
 *      description: Endpoint for delete reservation
 *      summary: Delete reservation
 *      tags:
 *      - reservations
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
 * /reservations:
 *  get:
 *      description: Endpoint for get all reservations
 *      summary: Get all reservations
 *      tags:
 *      - reservations
 *      responses:
 *          200:
 *              description: Ok
 *          404:
 *              description: Not found
 */
router.get("/", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getAll)

/**
 * @openapi
 * /reservations/{id}:
 *  get:
 *      description: Endpoint for get reservation by id
 *      summary: Get reservation by id
 *      tags:
 *      - reservations
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: Not found
 */
router.get("/:id", verifyJWT, controller.getById)

/**
 * @openapi
 * /reservations/client/{id}:
 *  get:
 *      description: Endpoint for get reservation by client id
 *      summary: Get reservation by client id
 *      tags:
 *      - reservations
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
 * /reservations/employee/{id}:
 *  get:
 *      description: Endpoint for get reservation by employee id
 *      summary: Get reservation by employee id
 *      tags:
 *      - reservations
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
 * /reservations/reservationstatus/{id}:
 *  get:
 *      description: Endpoint for get reservation by reservation status id
 *      summary: Get reservation by reservation status id
 *      tags:
 *      - reservations
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
router.get("/reservationstatus/:id", verifyJWT, verifyRole(ROLE_LIST.admin, ROLE_LIST.employee), controller.getByReservationStatusId)

/**
 * @openapi
 * /reservations/table/{id}:
 *  get:
 *      description: Endpoint for get reservation by table id
 *      summary: Get reservation by table id
 *      tags:
 *      - reservations
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