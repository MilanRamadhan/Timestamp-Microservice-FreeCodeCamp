const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// Endpoint /api/:date?
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  let date;

  // Jika tidak ada parameter (kosong), gunakan tanggal sekarang
  if (!dateParam) {
    date = new Date();
  } else {
    // Jika param hanya angka (unix timestamp)
    if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Validasi apakah date valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Jika valid, kembalikan format yang diminta
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Jalankan server
const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
