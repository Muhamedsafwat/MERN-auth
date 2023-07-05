const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//import routes
const userRoutes = require("./routes/userRoutes");
//import error handling middlewares
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
//import db configuration
const connectDB = require("./config/db");
//configure .env and port
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());

//connecting to database
connectDB();

//Configure server to accept request body as json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//configuring routers
app.use("/api/users", userRoutes);

//error handling middlewares
app.use(notFound);
app.use(errorHandler);

//create server and listen on port 5000
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
