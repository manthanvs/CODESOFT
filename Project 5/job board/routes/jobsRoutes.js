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

// * Routes

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Operations on Jobs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Jobs:
 *       type: object
 *       required:
 *         - company
 *         - position
 *         - status
 *         - workType
 *         - workLocation
 *       properties:
 *         id:
 *           type: string
 *           description: This is Auto-generated Id of the Job created
 *           example: 6519c705144ea37da6f61b11
 *         company:
 *           type: string
 *           description: This is Company Name of the Job.
 *           example: "Accenture"
 *         position:
 *           type: string
 *           description: This is Position of the Job required.
 *           example: "Full Stack Web Developer"
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - interview
 *             - declined
 *           description: This is the Status of the Job
 *           example: interview
 *         workType:
 *           type: string
 *           enum:
 *             - full-time
 *             - part-time
 *             - internship
 *             - contract
 *           description: This is the Working mode of the Job.
 *           example: internship
 *         workLocation:
 *           type: string
 *           description: This is the location of the Job.
 *           example: Mumbai
 *         createdBy:
 *           type: string
 *           description: This is the Id of the User that Created the Job.
 *           example: 651bd9ba085126f0fc382dz11
 *       additionalProperties: false
 */

// CREATE JOBS || POST
router.post("/create-job", userAuth, createJobController);

/**
 * @swagger
 * /api/v1/job/create-job:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Creates New Jobs
 *     description: "Creating Job By Respective User."
 *     tags:
 *       - Jobs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - position
 *             properties:
 *               company:
 *                type: string
 *                description: This is Company Name of the Job.
 *                example: "Accenture"
 *               position:
 *                 type: string
 *                 description: This is Position of the Job required.
 *                 example: "Full Stack Web Developer"
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - interview
 *                   - declined
 *                 description: This is the Status of the Job
 *                 example: interview
 *               workType:
 *                 type: string
 *                 enum:
 *                   - full-time
 *                   - part-time
 *                   - internship
 *                   - contract
 *                 description: This is the Working mode of the Job.
 *                 example: internship
 *               workLocation:
 *                 type: string
 *                 description: This is the location of the Job.
 *                 example: Mumbai
 *             additionalProperties: false
 *     responses:
 *       201:
 *         description: "Job Created Successfully"
 *       500:
 *         description: "Please Provide Company and Position Fields!"
 */

// DISPLAY JOBS || GET
router.get("/get-job", userAuth, getAllJobController);


/**
 * @swagger
 * /api/v1/job/get-job:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Statistics of the Job
 *     description: "Gives Statistics of the Jobs which were created By Respective User."
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - interview
 *             - declined 
 *             - all 
 *         description: Optional. Filter Jobs by Status
 *       - in: query
 *         name: workType
 *         schema:
 *           type: string
 *           enum:
 *             - full-time
 *             - part-time
 *             - internship
 *             - contract
 *             - all
 *         description: Optional. Filter Jobs by Work Type.
 * 
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Optional. Filter Jobs by Key-Words.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - a-z
 *             - z-a
 *             - latest
 *             - oldest
 *         description: Optional. Sort jobs by a specific criteria.("a-z/z-a" options does the sorting of job's on "position" field.)("latest/oldest" options does the sorting of job's on it Creation or Updated time)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Optional. Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Optional. Maximum number of jobs to return per page.
 *     responses:
 *       201:
 *         description: "Gives Statistics of the Jobs which were created the user."
 *       500:
 *         description: "Authentication Failed"
 */

// UPDATE JOBS || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: Updates Job
 *     description: "Updating Job which is created By Respective User."
 *     tags:
 *       - Jobs
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 'The Job Id that needs to be fetched and updated'
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - position
 *             properties:
 *               company:
 *                type: string
 *                description: This is Company Name which is to be updated of the Job.
 *                example: "Accenture"
 *               position:
 *                 type: string
 *                 description: This is Position which has to be Updated of the Job required.
 *                 example: "Full Stack Web Developer"
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - interview
 *                   - declined
 *                 description: This is the Status of the Job which has to be Updated.
 *                 example: interview
 *               workType:
 *                 type: string
 *                 enum:
 *                   - full-time
 *                   - part-time
 *                   - internship
 *                   - contract
 *                 description: This is the Working mode of the Job which has to be Updated..
 *                 example: internship
 *               workLocation:
 *                 type: string
 *                 description: This is the location of the Job which has to be Updated.
 *                 example: Mumbai
 *             additionalProperties: false
 *     responses:
 *       201:
 *         description: "Job Updated Successfully"
 *       500:
 *         description: "Please Provide Company and Position Fields!"
 */

// DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

/**
 * @swagger
 * /api/v1/job/delete-job/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes the Job which
 *     description: "Deleting Job which is created By Respective User."
 *     tags:
 *       - Jobs
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 'The Job Id that needs to be fetched and deleted'
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: "Job Deleted Successfully"
 *       500:
 *         description: "No Job Found with this ID:{id}"
 */

// JOBS STATS FILTER || DELETE
router.get("/job-stats", userAuth, jobStatsController);

/**
 * @swagger
 * /api/v1/job/job-stats:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Statistics of the Job
 *     description: "Gives Statistics of the Jobs which were created By Respective User."
 *     tags:
 *       - Jobs
 *     responses:
 *       201:
 *         description: "Gives Statistics of the Jobs which were created the user."
 *       500:
 *         description: "Authentication Failed"
 */

export default router;
