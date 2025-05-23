const express = require("express");
const app = express();

// Middleware untuk file statis (jika ada halaman HTML/CSS)
app.use(express.static("public"));

// Jalankan server
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running");
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  // Jika tidak ada parameter, gunakan waktu sekarang
  if (!dateParam) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Deteksi apakah dateParam adalah UNIX timestamp
  // (semua angka berarti kemungkinan besar timestamp)
  let date = /^\d+$/.test(dateParam) ? new Date(parseInt(dateParam)) : new Date(dateParam);

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});
