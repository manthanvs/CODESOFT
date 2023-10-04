import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
	const authHeader = req.headers.authorization;
    // * Checking the Naming Conventions used for JWT
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		next("Authentication Failed.");
	}

	try {
        const token = authHeader.split(" ")[1];
		const payload = JWT.verify(token, process.env.JWT_SECRET);
		req.user = { userId: payload.userId };
		next();
	} catch (error) {
		next("Authentication Failed");
	}
};

export default userAuth;
