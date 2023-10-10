import jobsModels from "../models/jobsModels.js";
import mongoose from "mongoose";
import moment from "moment";

// * CREATE JOB
export const createJobController = async (req, res, next) => {
	const { company, position } = req.body;

	if (!company || !position) {
		next("Please Provide All Fields!");
	}

	req.body.createdBy = req.user.userId;

	const newJob = await jobsModels.create(req.body);
	res.status(201).json({ newJob });
};

// * DISPLAY JOBS
export const getAllJobController = async (req, res, next) => {
	const { status, workType, search, sort } = req.query;

	// *  Searching Filters : Conditions
	const queryObject = {
		createdBy: req.user.userId,
	};

	// console.log(queryObject); // this will contain the createdBy : user's Id
	// * Logic of Filters
	// * STATUS
	if (status && status !== "all") {
		// this is to check weather the status is present? and if yes then is it set to something.
		queryObject.status = status;
		// if status is set to "all" then queryObject.status = status; will not be performed and the
		// queryObject will only have {createdBy : userId} jobsModels.find(queryObject) will find ""all"" the jobs of the createdBy User ID.
	}
	// console.log(queryObject); // {createdBy : userId , status: req.query } given from query params ["pending","reject","interview"];
	// and now "jobsModels.find(queryObject);" will find the only those jobs which are createdBy User ID and have following status["pending","reject","interview"];

	// * WORK-TYPE
	// * similar to the status we add conditions to the workType
	if (workType && workType !== "all") {
		queryObject.workType = workType;
	}

	// * SEARCH
	if (search) {
		queryObject.position = { $regex: search, $options: "i" };
		// $regex and $options both are mongodb regular expression operator.

		// "$regex : search" takes search and converts its regular expression
		// "$options : 'i'" meaning the regular expression will be compared with case-insensitive properties.
	}

	let queryResult = jobsModels.find(queryObject);

	// * Sorting
	// sorting by latest to oldest job created.
	if (sort === "latest") {
		queryResult = queryResult.sort("-createdAt");
	}
	// sorting by oldest to latest job created.
	if (sort === "oldest") {
		queryResult = queryResult.sort("createdAt");
	}
	// sorting by A-Z positions in alphabetical order.
	if (sort === "a-z") {
		queryResult = queryResult.sort("position");
	}
	// sorting by Z-A positions in reverse alphabetical order.
	if (sort === "z-a") {
		queryResult = queryResult.sort("-position");
	}

	// * Total Jobs
	const totalJobs = await jobsModels.countDocuments(queryResult);

	// * Pagination
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;

	const skip = (page - 1) * limit; // the page itself - 1 then multiply the limit to it.
	// basically for 2nd page, 10 records should be skipped because 10 records are shown in the 1st page.
	// so for skip = (2` - 1) * 10` i.e. 1*10` = 10
	// for 3rd page, 20 records should be skipped because 20 records are shown in the 1st and 2nd page.
	// so for skip = (3` - 1) * 10` i.e. 2*10` = 20
	// and likewise.

	// * Mongodb Has it's own skip function and limit function for pagination.
	// queryResult.skip() this function consider's all records after skipping specific number of records.
	// queryResult.limit() this function consider's specific number of records. i.e. suppose for queryResult.limit(10)it will take only 10 records into consideration.

	// queryResult.skip(skip).limit(limit) this will skip the number of records and then take the specific number of records into consideration.

	queryResult = queryResult.skip(skip).limit(limit);

	// * Counting Jobs on that particular page
	const jobsOnPage = await jobsModels.countDocuments(queryResult);

	// * Page Number.
	const numOfPages = Math.ceil(totalJobs / limit);

	// * Sending the response
	const jobs = await queryResult;
	// const jobs = await jobsModels.find({ createdBy: req.user.userId }); // * used when All jobs to be displayed

	res.status(200).json({
		totalJobs,
		numOfPages,
		page,
		jobsOnPage,
		jobs,
	});
};

// * UPDATE JOB
export const updateJobController = async (req, res, next) => {
	const { id } = req.params;
	const { company, position } = req.body;

	// validation
	if (!company || !position) {
		next("Please Provide All Fields!");
	}
	// find JOB
	const job = await jobsModels.findOne({ _id: id });

	// check if job is present or not
	if (!job) {
		next(`No Jobs Found With this Respective id:${id}`);
	}

	// validation for the only creator can update the job
	// req.user.userId !== job.createdBy.toString() => true ,that means the one who created the job is not updating the values therefore we send it to the error handling
	if (req.user.userId !== job.createdBy.toString()) {
		next("You're not Authorized person To Update this Job.");
		// we return here because we don't want the further updating process to be proceeded
		return;
	}

	const updateJob = await jobsModels.findOneAndUpdate({ _id: id }, req.body, {
		new: true,
		runValidators: true,
	});

	// * Sending the response
	res.status(200).json({
		updateJob,
	});
};

// * DELETE JOB

export const deleteJobController = async (req, res, next) => {
	const { id } = req.params;

	// find JOB
	const job = await jobsModels.findOne({ _id: id });

	// Validation
	if (!job) {
		next(`No Job Found with this ID: ${id}`);
	}

	if (req.user.userId !== job.createdBy.toString()) {
		next("You're not Authorized person To Delete this Job.");
		return;
	}
	await job.deleteOne();
	res.status(200).json({
		message: "Job Deleted Successfully!",
	});
};

// * JOBS Statistics and Filter

export const jobStatsController = async (req, res) => {
	const stats = await jobsModels.aggregate([
		// search by user jobs
		{
			$match: {
				createdBy: new mongoose.Types.ObjectId(req.user.userId),
			},
		},
		{
			$group: {
				_id: "$status",
				count: { $sum: 1 },
			},
		},
	]);

	/*
	to convert this:
	[
		{ _id: 'reject', count: 18 },
		{ _id: 'pending', count: 22 },
		{ _id: 'interview', count: 23 }
	]
	into this :
	{
		reject: 18,
		pending: 22,
		interview: 23
	};

	we use 
	*/

	// const short_stats = {};
	// stats.map((item) => {
	// 	short_stats[item._id] = item.count;
	// });
	// OR
	const short_stats = stats.reduce((obj, item) => {
		obj[item._id] = item.count;
		return obj;
	}, {});

	// *default stats
	const defaultStats = {
		pending: short_stats.pending || 0,
		reject: short_stats.reject || 0,
		interview: short_stats.interview || 0,
	};

	// * Monthly / yearly statistics

	let monthlyApplications = await jobsModels.aggregate([
		// search by user jobs
		{
			$match: {
				createdBy: new mongoose.Types.ObjectId(req.user.userId),
			},
		},
		{
			$group: {
				_id: {
					year: { $year: "$createdAt" },
					month: { $month: "$createdAt" },
				},
				count: {
					$sum: 1,
				},
			},
		},
	]);

	// * This is used to show a proper Month and Year
	/* before the API used to show 
		=>
		monthlyApplications:[
			_id:{
				"year":2023,
				"month":3
			},
			"count":6
		]

		but after using moment library the same API shows a proper 
		timestamp 
		=>
			monthlyApplications:[
				{
					"date": "Mar 2023",
					"count": 6
				}
			]
	*/
	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = moment()
				.month(month - 1)
				.year(year)
				.format("MMM Y");
			return { date, count };
		})
		.reverse();

	res.status(200).json({
		totalJobs: stats.length,
		defaultStats,
		monthlyApplications,
	});
};
