const express = require('express');
const router = express.Router();
const controller = require('../controllers/clients');


// Menggunakan middleware 
router.get('/', controller.getAllClients);
router.get('/:id', controller.getClientByID);
router.post('/store', controller.createClient);
router.put('/edit/:id', controller.editClient);
router.delete('/:id', controller.deleteClient);
router.post('/upload', controller.uploadImage)

module.exports = router;