import mongoose from "mongoose";
// * Validator imported to validate the input fields such as email, etc.
import validator from "validator";
// * Bcrypt Used to encrypt all the storing passwords and decrypt while fetching them back.
import bcrypt from "bcryptjs";


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
            minlength: [8,"Password length should be greater than 8 characters"]
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
userSchema.pre("save",async function(){
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password,salt);
})

export default mongoose.model("User", userSchema);
