const uuid = require("uuid/v4");

const bookmarks = [
  {
    id: uuid(),
    title: "Reddit",
    url: "https://www.reddit.com",
    description: "Front page of the internet",
    rating: 3
  },
  {
    id: uuid(),
    title: "YouTube",
    url: "https://www.youtube.com",
    description: "Don't have a TV?  Watch YouTube",
    rating: 5
  },
  {
    id: uuid(),
    title: "Twitch",
    url: "https://twitch.tv",
    description: "Watch people play games",
    rating: 4
  }
];

module.exports = { bookmarks };