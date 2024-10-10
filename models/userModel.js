// import mongoose from "mongoose";
// import validator from "validator";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
// 	{
// 		name: {
// 			type: String,
// 			required: [true, "Please tell us your name."],
// 		},
// 		email: {
// 			type: String,
// 			required: [true, "Please provide your email address."],
// 			unique: true,
// 			lowercase: true,
// 			validate: [validator.isEmail, "Please provide a valid email address."],
// 		},
// 		phoneNumber: {
// 			type: String,
// 			unique: true,
// 		},
// 		image: {
// 			type: String,
// 		},
// 		role: {
// 			type: String,
// 			enum: ["admin", "user"],
// 			default: "user",
// 		},
// 		password: {
// 			type: String,
// 			required: [true, "Please provide a password."],
// 			minlength: 8,
// 			select: false,
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// userSchema.methods.correctPassword = async function (
// 	candidatePassword,
// 	userPassword
// ) {
// 	return await bcrypt.compare(candidatePassword, userPassword);
// };

// userSchema.pre("save", async function (next) {
// 	// Only work when the password is not modified
// 	if (!this.isModified("password")) return next();

// 	// Hash the password using cost of 12
// 	this.password = await bcrypt.hash(this.password, 12);

// 	next();
// });

// const User = mongoose.model("User", userSchema);

// export default User;


import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please tell us your name."],
			trim: true, // Remove whitespace
		},
		email: {
			type: String,
			required: [true, "Please provide your email address."],
			unique: true,
			lowercase: true,
			trim: true, // Remove whitespace
			validate: {
				validator: validator.isEmail,
				message: "Please provide a valid email address.",
			},
		},
		phoneNumber: {
			type: String,
			unique: true,
			trim: true, // Remove whitespace
			validate: {
				validator: function(v) {
					// Basic phone number validation (adjust regex as needed)
					return /^\+?[1-9]\d{1,14}$/.test(v);
				},
				message: props => `${props.value} is not a valid phone number!`,
			},
		},
		image: {
			type: String,
			default: 'default.jpg', // Optional: provide a default image
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
		password: {
			type: String,
			required: [true, "Please provide a password."],
			minlength: 8,
			select: false, // Do not send the password in responses
		},
	},
	{
		timestamps: true,
	}
);

// Password comparison method
userSchema.methods.correctPassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

// Hashing the password before saving
userSchema.pre("save", async function (next) {
	// Only hash the password if it has been modified or is new
	if (!this.isModified("password")) return next();

	// Hash the password using a cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	next();
});

// Handle trimming whitespace before validation
userSchema.pre('validate', function(next) {
	this.name = this.name.trim();
	this.email = this.email.trim();
	this.phoneNumber = this.phoneNumber ? this.phoneNumber.trim() : this.phoneNumber;
	next();
});

const User = mongoose.model("User", userSchema);

export default User;
