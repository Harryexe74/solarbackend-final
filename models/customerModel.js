// import mongoose from "mongoose";
// import validator from "validator";
// import bcrypt from "bcryptjs";

// const addressSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 	},
// 	address: {
// 		type: String,
// 	},
// 	phone: {
// 		type: String,
// 	},
// });

// const customerSchema = new mongoose.Schema(
// 	{
// 		firstName: {
// 			type: String,
// 			required: [true, "Please tell us your name."],
// 		},
// 		lastName: {
// 			type: String,
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
// 		// image: {
// 		// 	type: String,
// 		// },
// 		role: {
// 			type: String,
// 			enum: ["customer"],
// 			default: "customer",
// 		},
	
// 		password: {
// 			type: String,
// 			required: [true, "Please provide a password."],
// 			minlength: 8,
// 			select: false,
// 		},
// 		// status: {
// 		// 	type: String,
// 		// 	enum: ["active", "inactive"],
// 		// 	default: "active",
// 		// },
// 		// permanentAddress: addressSchema,
// 		// officeShippingAddress: addressSchema,
// 		// officeBillingAddress: addressSchema,
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// customerSchema.methods.correctPassword = async function (
// 	candidatePassword,
// 	customerPassword
// ) {
// 	return await bcrypt.compare(candidatePassword, customerPassword);
// };

// customerSchema.pre("save", async function (next) {
// 	// Only work when the password is not modified
// 	if (!this.isModified("password")) return next();

// 	// Hash the password using cost of 12
// 	this.password = await bcrypt.hash(this.password, 12);

// 	next();
// });

// const Customer = mongoose.model("Customer", customerSchema);

// export default Customer;


import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// Address schema for customer addresses
const addressSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		validate: {
			validator: function (v) {
				// Basic phone validation (can customize based on country codes)
				return /\d{10,15}/.test(v);
			},
			message: (props) => `${props.value} is not a valid phone number!`,
		},
		required: [true, "Phone number required for address."],
	},
});

// Main Customer schema
const customerSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "Please tell us your first name."],
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: [true, "Please provide your email address."],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, "Please provide a valid email address."],
		},
		phoneNumber: {
			type: String,
			unique: true,
			validate: {
				validator: function (v) {
					// Example phone number validation (adjust regex for desired pattern)
					return /\d{10,15}/.test(v);
				},
				message: (props) => `${props.value} is not a valid phone number!`,
			},
		},
		role: {
			type: String,
			enum: ["customer"],
			default: "customer",
		},
		password: {
			type: String,
			required: [true, "Please provide a password."],
			minlength: 8,
			select: false, // Ensures password is not returned in queries
		},
		permanentAddress: addressSchema, // Example of how to use the address schema
		officeShippingAddress: addressSchema,
		officeBillingAddress: addressSchema,
	},
	{
		timestamps: true, // Automatically handles createdAt and updatedAt fields
	}
);

// Pre-save hook to hash passwords before saving
customerSchema.pre("save", async function (next) {
	// Only hash the password if it has been modified (or is new)
	if (!this.isModified("password")) return next();

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

// Method to check if passwords match during login
customerSchema.methods.correctPassword = async function (
	candidatePassword,
	customerPassword
) {
	return await bcrypt.compare(candidatePassword, customerPassword);
};

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
