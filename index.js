const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS untuk FreeCodeCamp test
app.use(cors());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// Timestamp endpoint
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
  let parsedDate;

  if (!date) {
    parsedDate = new Date();
  } else {
    // Deteksi jika date adalah Unix timestamp (angka murni)
    if (!isNaN(date) && /^\d+$/.test(date)) {
      parsedDate = new Date(parseInt(date));
    } else {
      parsedDate = new Date(date);
    }
  }

  // Cek validitas
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

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
