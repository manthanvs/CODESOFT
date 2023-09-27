// express imported
// const express = require("express"); before ES6

// Importing required modules
import express from "express";
// express-async-errors imported to remove excess use of try catch block
import "express-async-errors"
// dotenv imported for environmental variables
import dotenv from "dotenv";
// cors imported to discard cross origin error 
import cors from "cors";
// morgan imported to monitor rest api's
import morgan from "morgan";


// * File imports
// function for mongoDB connection through mongoose
import connectDB from './config/db.js';


// routes import
import testRoutes from './routes/TestRoute.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';


// Configuring dotenv to use environment variables
dotenv.config();
// if the path of .env file is outside the root file then give the configure method the path of the .env file
// eg: dotenv.config({path:"./config"});
// here the file would be placed in the config folder parallel to node_modules folder
// console.log(process.env);

// mongoDB connection function
connectDB();

// **Rest object 
// created from express
// Creating an express application
	const app = express();

// ** Middlewares 

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
	app.use('/api/v1/test',testRoutes);
	app.use('/api/v1/auth',authRoutes);

// validation middleware
// ! used errorMiddleware after the routes because if we use errorMiddleware in start then further code won't be used.
	app.use(errorMiddleware);

// ** Extracting port
//  from environment variables
const DEFAULT_PORT = 8080;
const DEFAULT_DEV_MODE = 'development';
const PORT = process.env.PORT || DEFAULT_PORT;
const DEV_MODE = process.env.DEV_MODE || DEFAULT_DEV_MODE;


// ** Starting the server
app.listen(PORT, () => {
	console.log(`Node Server is in ${DEV_MODE} mode and it is running on port ${PORT}`);
})
