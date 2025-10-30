require("dotenv").config();

const mongoose = require("mongoose");
const Movies = require("./models/movies");
const movieJson = require("./movies.json");

// we are about to populate , delete, update movie.json API to the database
const populate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database for API connected Successfully");

    console.log("Deleting previous data...");
    await Movies.deleteMany();
    console.log("Previous method deleted successfully");

    console.log("uploading new data...");
    await Movies.create(movieJson);
    console.log(movieJson);
    console.log("Movies uploading succesfuly to the database");

    process.exit(0);
  } catch (error) {
    console.error({ Error: error.message });
    console.log("Unable to connect");
    process.exit(1);
  }
};
populate();
