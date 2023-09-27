import userModels from "../models/userModels.js";

// export const registerController = async (req, res, next) => {
// 	try {
// 		const { name, email, password } = req.body;

// 		// validate weather the unpack variables are loaded or not
// 		if (!name) {
// 			next("Please Provide Name");
// 		}
// 		if (!email) {
// 			next("Please Provide Email");
// 		}
// 		if (!password) {
// 			next("Please Provide Password with greater than 6 characters!");
// 		}

// 		const existingUser = await userModels.findOne({ email });
// 		if (existingUser) {
// 			next("Email Already Registered Please Login.");
// 		}

// 		const user = await userModels.create({ name, email, password });
// 		res.status(201).send({
// 			success: true,
// 			message: "User Created Successfully",
// 			user,
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };
// //* when we don't use express-async-errors package.




export const registerController = async (req, res, next) => {
		const { name, email, password } = req.body;

		// // validate weather the unpack variables are loaded or not
		// if (!name) {
		// 	next("Please Provide Name");
		// }
		// if (!email) {
		// 	next("Please Provide Email");
		// }
		// if (!password) {
		// 	next("Please Provide Password with greater than 6 characters!");
		// }

		// const existingUser = await userModels.findOne({ email });
		// if (existingUser) {
		// 	next("Email Already Registered Please Login.");
		// }

		const user = await userModels.create({ name, email, password });
		res.status(201).send({
			success: true,
			message: "User Created Successfully",
			user,
		});
}
// //* when we use express-async-errors package. i.e. discard the try catch block.
