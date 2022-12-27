const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

/**
 * @openapi
 * /auth/logout:
 *  get:
 *      description: Endpoint for logout
 *      summary: Logout
 *      tags:
 *      - auth
 *      responses:
 *          200:
 *              description: Ok
 *          204:
 *              description: Cookie not set
 */
router.get('/logout', AuthController.logout);

/**
 * @openapi
 * /auth/refresh:
 *  get:
 *      description: Endpoint for refresh token
 *      summary: Refresh token
 *      tags:
 *      - auth
 *      responses:
 *          200:
 *              description: Ok
 *          401:
 *              description: Not authorized
 *          403:
 *              description: Forbidden
 */
router.get('/refresh', AuthController.handleRefreshToken)

/**
 * @openapi
 * /auth/requestpasswordreset:
 *  post:
 *      description: Endpoint for request password reset
 *      summary: Request password reset
 *      tags:
 *      - auth
 *      parameters:
 *          - name: email
 *            in: body
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.post('/requestpasswordreset', AuthController.request);

/**
 * @openapi
 * /auth/resetpassword:
 *  post:
 *      description: Endpoint for password reset
 *      summary: Password reset
 *      tags:
 *      - auth
 *      parameters:
 *          - name: email
 *            in: body
 *            required: true
 *          - name: resetCode
 *            in: body
 *            required: true
 *          - name: password
 *            in: body
 *            required: true
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request
 */
router.post('/resetpassword', AuthController.reset);


module.exports = router