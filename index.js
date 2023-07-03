const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/asset", express.static("asset"));

const auth = require("./src/routes/auth");
const talent = require("./src/routes/talent");
const skill = require("./src/routes/skill");

app.use(`/auth`, auth);
app.use("/talent", talent);
app.use("/skill/", skill);

// Route utama
// app.get("/", (req, res) => {
//   res.send("Selamat datang di aplikasi Node.js dan Express.js!");
// });

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
