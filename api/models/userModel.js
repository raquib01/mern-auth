const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			match: /^[a-zA-Z0-9\s]*$/, // matches a-zA-Z0-9 and spaces
			minLength: 3,
			maxLength: 30,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
			match:
				/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$/, // matches case insensitive email ids
		},
		password: {
			type: String,
			required: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		profileImg: {
			type: String, //TODO: Add a validator to check img extention
		},
	},
	{ timestamps: true }
);

// encrypting password before save
userSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) return next();
		const hash = await bcrypt.hash(this.password, saltRounds);
		this.password = hash;
		next();
	} catch (err) {
		next(err);
	}
});

// comparing password
userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
