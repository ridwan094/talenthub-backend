const express = require('express');
const app = express();
const port = 3000;

// Route utama
app.get('/', (req, res) => {
    res.send('Selamat datang di aplikasi Node.js dan Express.js!');
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
