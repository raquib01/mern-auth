const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const protected = async (req, res, next) => {
	const token = req.cookies.auth;
	if (!token) return res.status(401).json({ success: false, message: "User not login in" });

	// verifying token
	jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
		if (err) {
			if (err.name === "TokenExpiredError") {
				return res.status(401).json({ success: false, message: "Token expired" });
			}
			return res.status(401).json({ success: false, message: "Invalid Token" });
		}
		req.user = decoded;
		next();
	});
};

module.exports = protected;
