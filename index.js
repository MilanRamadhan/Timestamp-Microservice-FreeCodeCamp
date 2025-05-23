const express = require("express");
const app = express();

// Aktifkan folder public untuk menyajikan file statis seperti HTML, CSS, JS
app.use(express.static("public"));

// Endpoint utama akan menampilkan index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  let date = req.params.date;

  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Cek apakah input berupa angka (timestamp unix)
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Jalankan server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
