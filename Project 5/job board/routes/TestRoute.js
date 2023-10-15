import express from "express";
import { testPostController } from "./../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

//* router object
const router = express.Router();

// routes

/**
 *  @swagger
 *  tags:
 *    name: Test
 *    description: Operations for Test
 */


/**
 * @swagger
 * /api/v1/test/test-post:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: This is Used to Test Purposes
 *     tags:
 *       - Test
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Your Name will be printed."
 *       500:
 *         description: "Authentication Failed"
 *         
 */

router.post("/test-post", userAuth, testPostController);

export default router;
