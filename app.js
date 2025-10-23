require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");
const authRouter = require("./routes/authRouter"); //import auth router to route folder
const movieRouter = require("./routes/movieRouter");
const bookmarkRouter = require("./routes/bookmarkRouter");

const app = express();

const port = process.env.PORT || 1010;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);
app.use("/api/bookmark", bookmarkRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");

    await app.listen(port);
    console.log(`server is running on PORT ${port}`);
  } catch (error) {
    console.error("unable to connect to Database");
  }
};
start();
