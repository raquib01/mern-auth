const express = require("express");
const app = express();
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const cors = require("cors");
// using cors for allowing api calls from other endpoint
app.use(
	cors({
		origin: process.env.CLIENT_HOST, // Replace with your frontend's URL
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true, // Enable cookies and other credentials to be sent
	})
);

// connecting to db
require("./config/db");

// cookie parser
app.use(cookieParser());

// json parser
app.use(express.json());

// routing
app.use("/api/auth", authRoutes);

// static file
if (process.env.NODE_ENV === "production") {
	// serving static file
	app.use(express.static(path.join(__dirname, "..", "client", "dist")));

	// serving react app for all routes
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
	});
}

// 404 Handler
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: `Not Found => ${req.method} ${req.originalUrl}`,
	});
});

// mongoose error handler
app.use((err, req, res, next) => {
	if (err.name === "CastError" && err.kind === "ObjectId") {
		// when objectid does not get parsed(invalid objectid)
		return res.status(404).json({
			success: false,
			message: "Resource Not Found",
		});
	}
	next(err);
});

// express error handler
app.use((err, req, res, next) => {
	// including detail error only in development
	const includeErr = process.env.NODE_ENV === "development";
	const error = includeErr ? err.message : undefined;
	const stack = includeErr ? err.stack : undefined;

	console.error(err);

	res.status(500).json({
		success: false,
		message: "Internal Server Error",
		error,
		stack,
	});
});

const port = process.env.API_PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on http://127.0.0.1:${port}`);
});
