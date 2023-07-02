const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const auth = require("./src/routes/auth");

app.use(`/auth`, auth);

// Route utama
// app.get("/", (req, res) => {
//   res.send("Selamat datang di aplikasi Node.js dan Express.js!");
// });

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
