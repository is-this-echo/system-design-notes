const express = require("express");

const app = express();

const PORT = process.env.PORT;

app.get("/hello", (req, res) => {
  console.log(req.headers);
  res.send(`Hello from port ${PORT} \n`);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} . \n`);
});
