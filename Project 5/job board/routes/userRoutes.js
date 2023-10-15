import express from "express";
import userAuth from "./../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

// Router object
const router = express.Router();

// Routes

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 */

/**
 * @swagger
 * # Apply the security globally to all operations
 * security:
 *   - bearerAuth: []       # use the same name as above
 */


// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

/**
 * 
 * @swagger
 * /api/v1/user/update-user:
 *   put:
 *     security: 
 *       - bearerAuth: [] 
 *     summary: Updates user's properties in the database.
 *     description: 'With Authorized Token You can update your Informative fields.'
 *     tags: 
 *       - User
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - name
 *               - lastName
 *               - email
 *               - location
 *             properties:
 *               name:
 *                 type:
 *                 description: To Update User's Name.
 *                 example: test3
 *               lastName:
 *                 type:
 *                 description: To Update User's Last Name.
 *                 example: TesterLastNameNew
 *               email:
 *                 type:
 *                 description: To Update User's Email.
 *                 example: test3@gmail.com
 *               location:
 *                 type:
 *                 description: To Update User's Location.
 *                 example: New Poona, Maharashtra
 *             additionalProperties: false
 *     responses:
 *       200:
 *         description: 'Updated Values Successfully'
 *       500:
 *         description: "Authentication Failed"
 */

export default router;