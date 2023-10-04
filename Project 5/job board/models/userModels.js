import mongoose from "mongoose";
// * Validator imported to validate the input fields such as email, etc.
import validator from "validator";
// * Bcrypt Used to encrypt all the storing passwords and decrypt while fetching them back.
import bcrypt from "bcryptjs";
// * Json Web Token JWT to provide a secure and compact way to transmit data between parties
import JWT from "jsonwebtoken";

// schema
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required!"],
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: [true, "Email is required!"],
			unique: true,
			validate: validator.isEmail,
		},
		password: {
			type: String,
			required: [true, "Password is required!"],
			minlength: [
				8,
				"Password length should be greater than 8 characters",
			],
			select: true,
		},
		location: {
			type: String,
			default: "India",
		},
	},
	{ timestamps: true }
	// whenever new user is added then the timestamp is added as well
);

// * middleware
userSchema.pre("save", async function () {
	// * if password is not modified then don't encrypt it again
	if (!this.isModified("password")) {
		return;
	}
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

// * compare password
userSchema.methods.comparePassword = async function (userPassword) {
	const isMatch = await bcrypt.compare(userPassword, this.password);
	// bcrypt.compare() is a function that compares two strings and returns a boolean value indicating whether they are equal. The function uses a hashing algorithm to compare the two strings
	return isMatch;
};

// * JSON WEB TOKEN
userSchema.methods.createJWT = function () {
	// jwt.sign() function will return the signed token, which can be stored, transmitted, or used for authentication purposes
	return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
};

export default mongoose.model("User", userSchema);
