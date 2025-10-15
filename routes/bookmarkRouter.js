const express = require("express");
const auth = require("../middleware/auth");
const {
  allBookmarks,
  addBookmark,
  removeBookmark,
} = require("../controllers/bookmarkContext");

const router = express.Router();

router.get("/", auth, allBookmarks); // we use "/" to get all bookmarks
router.get("/add/:id", auth, addBookmark);
router.get("/remove/:id", auth, removeBookmark);

module.exports = router;
 