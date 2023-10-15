import express from "express";
import {
	loginController,
	registerController,
} from "./../controllers/authController.js";

// in order to make limit on requests by a single IP, we use express-rate-limit middleware.
import { rateLimit } from "express-rate-limit";
// * IP Limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
});

// * Router object
const router = express.Router();

// * Routes

/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: Operations about user
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: This is Auto-generated Id of the user collections.
 *           example: 651bd9ba085126f0fc382dz11
 *         name:
 *           type: string
 *           description: This is Name of the user.
 *           example: UserName
 *         lastName:
 *           type: string
 *           description: This is LastName of the user.
 *           example: UserLastName
 *         email:
 *           type: string
 *           description: This is Email of the user.
 *           example: user@gmail.com
 *         password:
 *           type: string
 *           description: This is Password of the user's collection
 *           example: User$12345
 */

// Registration || POST method
router.post("/register", limiter, registerController);

/**
 *  @swagger
 *  /api/v1/auth/register:
 *    post:
 *      summary: Register's new user
 *      description: 'authentication apis'
 *      tags: 
 *        - User
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - lastName
 *                - email
 *                - password
 *                - location
 *              properties:
 *                name:
 *                  type: string
 *                  description: User's Name.
 *                  example: test2
 *                lastName:
 *                  type: string
 *                  description: User's Last Name.
 *                  example: TesterLastName
 *                email:
 *                  type: string
 *                  description: User's Email Address.
 *                  example: test2@gmail.com
 *                password:
 *                  type: string
 *                  description: User's password which should have at least 8 characters.
 *                  example: 1234567890
 *                location:
 *                  type: string
 *                  description: User's Location - City/Country.
 *                  example: Pune, Maharashtra
 *      responses:
 *        200:
 *          description: User created successfully.
 *        500:
 *          description: Internal Server Error
 */

// Log In || POST method
router.post("/login", limiter, loginController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log's user into the system
 *     description: ''
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's Email Address.
 *                 example: test2@gmail.com
 *               password:
 *                 type: string
 *                 description: User's password which should have at least 8 characters.
 *                 example: 1234567890
 *             additionalProperties: false
 *     responses:
 *       200:
 *         description: Login Successfully
 *       500:
 *         description: Invalid Username or Password!  
 */


export default router;