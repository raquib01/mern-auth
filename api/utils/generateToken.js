const jwt = require("jsonwebtoken");

const generateToken = (res, payload) => {//TODO: promise wrap
	const token = jwt.sign(payload, process.env.AUTH_SECRET, {
		expiresIn: "1d",
		algorithm: "HS256",
	});

	res.cookie("auth", token, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		// secure: process.env.NODE_ENV !== "development",
		// sameSite: "strict",
		maxAge: 24 * 60 * 60 * 1000,
	});
};

module.exports = generateToken;
