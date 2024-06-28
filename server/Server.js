const express = require("express");
const cors = require("cors");
const routes = require("./routes/authRoutes");
const connectDB = require("./config/db.js")

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Connection to MongoDB

connectDB()

app.use("/api/", routes);

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
