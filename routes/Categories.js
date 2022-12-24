const express = require('express')
const router = express.Router()
const controller = require('../controllers/CategoryController')
const { verifyJWT } = require("../middlewares/verifyJWT")
const verifyRole = require("../middlewares/verifyRole")
const ROLE_LIST = require('../config/role_list')

/**
 * @openapi
 * /categories:
 *  post:
 *      description: Endpoint for create new category
 *      summary: Create category
 *      tags:
 *      - categories
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
 * /categories/update/{id}:
 *  put:
 *      description: Endpoint for update existing category
 *      summary: Update category
 *      tags:
 *      - categories
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
 * /categories/{id}:
 *  delete:
 *      description: Endpoint for delete category
 *      summary: Delete category
 *      tags:
 *      - categories
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
router.delete(`/:id`, verifyJWT, verifyRole(ROLE_LIST.admin), controller.delete)

/**
 * @openapi
 * /categories:
 *  get:
 *      description: Endpoint for get all categories
 *      summary: Get all categories
 *      tags:
 *      - categories
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.get("/", controller.getAll)

/**
 * @openapi
 * /categories/notempty:
 *  get:
 *      description: Endpoint for get all not empty categories
 *      summary: Get not empty categories
 *      tags:
 *      - categories
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.get("/notempty", controller.getAllNotEmpty)

/**
 * @openapi
 * /categories/{id}:
 *  get:
 *      description: Endpoint for get category by id
 *      summary: Get category by id
 *      tags:
 *      - categories
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
 * /categories/name/{name}:
 *  get:
 *      description: Endpoint for get category by name
 *      summary: Get category by name
 *      tags:
 *      - categories
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

module.exports = router