// * API Documentations
// swagger-jsdoc is used to create API documentation.
import swaggerDoc from "swagger-jsdoc";
// swagger-ui-express is used to create a good interface of the api
import swaggerUi from "swagger-ui-express";

// express imported
// const express = require("express"); before ES6

// * Importing required modules
import express from "express";
// express-async-errors imported to remove excess use of try catch block
import "express-async-errors";
// dotenv imported for environmental variables
import dotenv from "dotenv";
// cors imported to discard cross origin error
import cors from "cors";
// morgan imported to monitor rest api's
import morgan from "morgan";

// * Security package
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// * File imports
// function for mongoDB connection through mongoose
import connectDB from "./config/db.js";

// * Routes import
import testRoutes from "./routes/TestRoute.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// * Configuring dotenv to use environment variables
dotenv.config();
// if the path of .env file is outside the root file then give the configure method the path of the .env file
// eg: dotenv.config({path:"./config"});
// here the file would be placed in the config folder parallel to node_modules folder
// console.log(process.env);

// * mongoDB connection function
connectDB();

// * Swagger API config & Swagger API options
const options = {
	definition: {
		openapi: "3.0.3",
		info: {
			title: "Job Board Application",
			description: "Node ExpressJS Job Board Application",
		},
		servers: [
			{
				url: "http://localhost:8080",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

// **Rest object
// created from express
// Creating an express application
const app = express();

// ** Middlewares
// in order to maintain the security "Helmet" helps secure Express apps by setting HTTP response headers.
app.use(helmet());
// in order to save the inputs from xss attacks we use the "xss-clean" package.
app.use(xss());
// in order to sanitize and to protect the mongodb (database),we use the express-mongoose-sanitize.
app.use(mongoSanitize());
// in order to fetch json data from the user, we need to add middleware so that application gets to know that we are going to deal with json data.
app.use(express.json());
// in order to discard cross origin error: i.e. let ports interact with each other, we need to add middleware
app.use(cors());
// in order to show url fetched and status log's in the console, we need to add middleware
app.use(morgan("dev"));

// // Defining a route for the root path
// app.get("/", (req, res) => {
// 	res.send("<h1>Welcome to Server</h1>");
// });

// ** Routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

// ** Home Route
// creating a specific route so that user's get the documentation only when he searches manually for the "url/api-doc" not on the route("url" itself) because keeping it on route would make it vulnerable to anyone.
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// validation middleware
// ! used errorMiddleware after the routes because if we use errorMiddleware in start then further code won't be used.
app.use(errorMiddleware);

// ** Extracting port
//  from environment variables
const DEFAULT_PORT = 8080;
const DEFAULT_DEV_MODE = "development";
const PORT = process.env.PORT || DEFAULT_PORT;
const DEV_MODE = process.env.DEV_MODE || DEFAULT_DEV_MODE;

// ** Starting the server
app.listen(PORT, () => {
	console.log(
		`Node Server is in ${DEV_MODE} mode and it is running on port ${PORT}`
	);
});
