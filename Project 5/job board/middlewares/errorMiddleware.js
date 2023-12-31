// Error Middleware || NEXT function

const errorMiddleware = (err, req, res, next) => {
	const defaultErrors = {
		statusCode: 500,
		message: err,
	};

	// missing field error
	if (err.name === "ValidationError") {
		defaultErrors.statusCode = 400;
		defaultErrors.message = Object.values(err.errors)
			.map((item) => item.message)
			.join(", ");
	}

	// duplicate key error

	if (err.code && err.code === 11000) {
		defaultErrors.statusCode = 400;
		defaultErrors.message = `The ${Object.keys(err.keyValue)} field should be Unique.`;
	}

	res.status(defaultErrors.statusCode).json({
		message: defaultErrors.message,
	});

	// res.status(500).send({
	//     success:false,
	//     message:"Something Went Wrong",
	//     err,
	// });
};

export default errorMiddleware;
