import express from "express";

import userAuth from "./../middlewares/authMiddleware.js";
import {
	createJobController,
	getAllJobController,
	updateJobController,
	deleteJobController,
	jobStatsController,
} from "./../controllers/jobsController.js";

// * Router object
const router = express.Router();

// * routes
// CREATE JOBS || POST
router.post("/create-job", userAuth, createJobController);

// DISPLAY JOBS || GET
router.get("/get-job", userAuth, getAllJobController);

// UPDATE JOBS || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

// DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

// JOBS STATS FILTER || DELETE
router.get("/job-stats", userAuth, jobStatsController);

export default router;
