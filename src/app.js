require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const validateBearerToken = require("./validate-bearer-token");
const errorHandler = require("./error-handler");
const bookmarksRouter = require("./bookmarks/bookmarks-router");
const BookmarksService = require('./bookmarks/bookmarks-service');

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(validateBearerToken);

app.use(bookmarksRouter);


app.get("/", (req, res) => {
  res.send("Hello, world!");
});


// app.get('/square/:num', (req, res, next) => {
//   const knexInstance = req.app.get('db')
//   const answer = BookmarksService.square(req.params.num)
//     res.json(answer)
// })

// app.get('/bookmarks', (req, res, next) => {
//   const knexInstance = req.app.get('db')
//   BookmarksService.getAllBookmarks(knexInstance)
//     .then(boookmarks => {
//       res.json(boookmarks)
//     })
//     .catch(next)
// })


// app.get('/bookmarks/:bookmarks_id', (req, res, next) => {
//   const knexInstance = req.app.get('db')
//   BookmarksService.getById(knexInstance, req.params.bookmarks_id)
//     .then(bookmark => {
//       if (!bookmark) {
//         return res.status(404).json({
//           error: { message: `Bookmark not found` }
//         })
//       }
//       res.json(bookmark)
//     })
//     .catch(next)
// })

// app.delete('/bookmarks/:bookmarks_id', (req, res, next) => {
//   const knexInstance = req.app.delete('db')
//   BookmarksService.deleteBookmark(knexInstance, req.params.bookmarks_id)
//     .then(bookmark => {
//       if (!bookmark) {
//         return res.status(404).json({
//           error: { message: `Bookmark doesn't exist` }
//         })
//       }
//       res.json(bookmark)
//     })
//     .catch(next)
// })



app.use(errorHandler);

module.exports = app;