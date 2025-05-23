const express = require("express");
const app = express();

// Middleware untuk file statis (jika ada halaman HTML/CSS)
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Rute untuk /api dan /api/:date
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  // Jika parameter kosong, gunakan waktu saat ini
  if (!dateParam) {
    const now = new Date();
    return res.json({
      unix: now.getTime(), // Pastikan Number
      utc: now.toUTCString(), // Format: "Fri, 23 May 2025 19:58:00 GMT"
    });
  }

  // Coba konversi dateParam ke tanggal
  let date;
  // Jika dateParam hanya angka (UNIX timestamp)
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    // Jika string tanggal, coba parse langsung
    date = new Date(dateParam);
  }

  // Cek apakah tanggal valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Kembalikan hasil dalam format yang diminta
  return res.json({
    unix: date.getTime(), // Pastikan Number
    utc: date.toUTCString(), // Format: "Fri, 25 Dec 2015 00:00:00 GMT"
  });
});

// Jalankan server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
