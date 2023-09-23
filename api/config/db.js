const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// connecting to DB and logging error if failed
// by default, it tries to reconnect
const db_uri = process.env.DB_URI;
mongoose
	.connect(`${db_uri}/mern-auth`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to DB (Initial connection)");
	})
	.catch((err) => {
		console.error("Error connecting to DB (Initial connection)", err);
		process.exit(1);
	});

// Logging connection events
mongoose.connection.on("error", (err) => {
	console.error("Error connecting to DB (After inital connection)", err);
	process.exit(1);
});

mongoose.connection.on("connected", () => {
	console.error("DB connected");
});
mongoose.connection.on("disconnected", () => {
	console.error("DB Disconnected"); //  or can notify someone
});
// and for user, you need a express middleware error handling, for internal server error (go see in index.html)
