const express = require("express");
const dotenv = require("dotenv");

const { connectToMongoDb } = require("./db/conn");
const path = require("path");
const URL = require("./models/url");

// routes import
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();

// config file
dotenv.config({ path: "./config.env" });

const url = process.env.DB;
const PORT = process.env.PORT;

// database
connectToMongoDb(url)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database not connected due to ", err);
  });

// setting engines for server side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
