const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());

// Root
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running");
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  let parsedDate;

  // Jika parameter kosong, pakai waktu sekarang
  if (!date) {
    parsedDate = new Date();
  } else if (!isNaN(date)) {
    // Jika input angka (unix timestamp dalam ms atau detik)
    parsedDate = new Date(parseInt(date));
  } else {
    // Jika input string format date
    parsedDate = new Date(date);
  }

  // Cek validitas
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return JSON valid
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Jalankan server
const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
