const express = require("express");
const database = require("./database");

const app = express();
const cache = {};

// get data from database which has a timeout of 3 seconds
// localhost:3001/nocache/index.html
app.get("/nocache/index.html", (req, res) => {
  database.get("index.html", (page) => {
    res.send(page);
  });
});

// get data from cache if present else make a call to database and get the data, store it in cache
// so, the first time we call this endpoint, it will be slower(3secs) later on it will be faster
// locahost:3001/withcache/index.html
app.get("/withcache/index.html", (req, res) => {
  if ("index.html" in cache) {
    res.send(cache["index.html"]);
    return;
  }

  database.get("index.html", (page) => {
    cache["index.html"] = page;
    res.send(page);
  });
});

app.listen(3001, () => console.log("Listening on port 3001"));
