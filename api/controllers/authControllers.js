const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

// @desc		Authenticate user from db and generate token
// route		POST /api/auth/login
// @access	public
const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// checking if user exists
		const user = await User.findOne({ email });
		if (user && (await user.matchPassword(password))) {
			// if user exists and pswd matched
			generateToken(res, { id: user._id, email: user.email, name: user.name });
			res.status(200).json({
				success: true,
				message: "User Login successfully",
				data: {
					user: {
						id: user._id,
						email: user.email,
						name: user.name,
					},
				},
			});
		} else {
			res.status(401).json({ success: false, message: "Invalid credentials" });
		}
	} catch (err) {
		next(err);
	}
};

// @desc		Register User
// route		POST /api/auth/register
// @access	public
const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		// checking if it already exists
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(409).json({ success: false, message: "User already exists" });

		// creating new user
		const user = new User({ name, email, password });
		await user.save();

		generateToken(res, { id: user._id, email: user.email, name: user.name });
		return res.status(201).json({
			success: true,
			message: "User Registered Successfully!",
			data: {
				user: {
					id: user._id,
					email: user.email,
					name: user.name,
				},
			},
		});
	} catch (err) {
		next(err);
	}
};

// @desc		Logout User
// route		POST /api/auth/logout
// @access	public
const logout = (req, res, next) => {
	res.cookie("auth", "", {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		expires: new Date(0),
		// secure: process.env.NODE_ENV !== "development",
		// sameSite: "strict",
	});
	res.status(204).end();
};

// @desc		Get User Profile
// route		GET /api/auth/user
// @access	private
const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) return res.status(404).json({ success: false, message: "User not found!" });

		res.json({
			success: true,
			message: "User Fetched Successfully",
			data: {
				user: {
					id: user._id,
					email: user.email,
					name: user.name,
				},
			},
		});
	} catch (err) {
		next(err);
	}
};

// @desc		Update User Profile
// route		PUT /api/auth/user
// @access	private
const updateUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) return res.status(404).json({ success: false, message: "User not found!" });

		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		await user.save();

		res.status(201).json({
			success: true,
			message: "Updated Successfully",
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { login, register, logout, getUser, updateUser };
