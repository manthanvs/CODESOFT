import express from "express";
import {
	loginController,
	registerController,
} from "./../controllers/authController.js";

// router object
const router = express.Router();

// routes
// Registration || POST method
router.post("/register", registerController);

// Log In || POST method
router.post("/login", loginController);

export default router;