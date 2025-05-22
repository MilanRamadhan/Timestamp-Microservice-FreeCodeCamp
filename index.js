const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;

  if (!dateInput) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  if (!isNaN(dateInput) && /^\d+$/.test(dateInput)) {
    dateInput = parseInt(dateInput);
  }

  const date = new Date(dateInput);

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

module.exports = app;
