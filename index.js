const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;
const ip = "192.168.18.137";

app.use(cors());
app.use(express.json());

app.use("/asset", express.static("asset"));

const clients = require("./src/routes/clients");
const auth = require("./src/routes/auth");
const talent = require("./src/routes/talent");
const skill = require("./src/routes/skill");
const talent_skill = require("./src/routes/talentSkill");
const seniority = require("./src/routes/seniority");

app.use("/clients/", clients);
app.use(`/auth`, auth);
app.use("/talent", talent);
app.use("/skill", skill);
app.use("/talent_skill", talent_skill);
app.use("/seniority", seniority);

// Route utama
// app.get("/", (req, res) => {
//   res.send("Selamat datang di aplikasi Node.js dan Express.js!");
// });

// Jalankan server
app.listen(port, ip, () => {
  console.log(`Server berjalan di http://localhost:${port} ${ip}`);
});
