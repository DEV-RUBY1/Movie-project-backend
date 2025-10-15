const Movies = require("../models/movies");
// CONTROLLER TO GET ALL THE (SERIES & MOVIES)
const allData = async (req, res) => {
  try {
    const data = await Movies.find({});
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// CONTROLLER TO GET ONLY ALL THE SERIES
const allSeries = async (req, res) => {
  try {
    const series = await Movies.find({ type: "series" });
    res.status(200).json({ series });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// CONTROLLER TO GET ONLY ALL THE MOVIES
const allMovies = async (req, res) => {
  try {
    const movies = await Movies.find({ type: "movies" });
    res.status(200).json({ movies });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { allData, allSeries, allMovies };
