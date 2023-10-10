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
	const { name, email, password,lastName,location } = req.body;

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


	const user = await userModels.create({ name, email, password,lastName, location });
	// * Creating a token
	// token with the help of JWT
	const token = user.createJWT();
	// here user is used instead of userModels because we are creating the token for respective data which is driven from the user variable.

	res.status(201).send({
		success: true,
		message: "User Created Successfully",
		user: {
			name: user.name,
			lastName: user.lastName,
			email: user.email,
			location: user.location,
		},
		token,
	});
};
// //* when we use express-async-errors package. i.e. discard the try catch block.

export const loginController = async (req, res, next) => {
	const { email, password } = req.body;
	// validation
	if (!email || !password) {
		next("Please Provide All the Fields!");
	}

	// Find user by email
	const user = await userModels.findOne({ email }).select("+password");
	// findOne({email}) brings back the user with the same {email:email} and select makes sure that password field should be included in the retrieved document( "+password"=> includes , "-password"=> excludes)
	if (!user) {
		next("Invalid Username or Password!");
	}

	// Compare password
	const isMatch = await user.comparePassword(password);
	if (!isMatch) {
		next("Invalid Username or Password");
	}

	// * setting password as undefined to exclude it from sending as response.
	user.password = undefined;
	// * Creating the token for a successful login.
	const token = user.createJWT();

	res.status(200).json({
		success: true,
		message: "Login Successfully",
		user,
		token,
	});
};
