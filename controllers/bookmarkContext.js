const Movie = require("../models/movies");

//controller to get bookmarked movies
//defines an asynchronous function "allbookedmarked" to handle the retrieval of all movies bookmarked by a user.
const allBookmarks = async (req, res) => {
  try {
    //extracts the "userid" from the authenticated user(set by middleware to verify JWT token)
    const { userId } = req.user;

    //find all movies in the "movies" collection where the "bookmarkedBy" field includes the "userId"
    const bookmarks = await Movie.find({ bookmarkedBy: userId });

    //sends a success response with the status 200, returning the movies that the user has bookmarked
    res.status(200).json({
      data: bookmarks,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//controller to bookmark a new movie to the bookmark
const addBookmark = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $push: { bookmarkedBy: userId } }
    );
    if (!movie) {
      res.status(400).json({ message: `No movies with with ID:${id}` });
    }
    res.status(200).json({ message: "movies Bookmarked" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// CONTROLLER TO REMOVE AN EXISTING BOOKMARK
const removeBookmark = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $pull: { bookmarkedBy: userId } }
    );
    if (!movie) {
      res.status(400).json({ message: `No Movie with ID:${id}` });
    }
    res.status(200).json({ message: "Bookmarked Movie Removed Successfully" });
  } catch (error) {}
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
