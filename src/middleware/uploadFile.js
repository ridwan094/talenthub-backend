const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'asset/img');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
  },
});

const filesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'asset/files');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
  },
});

const upload = multer({ storage: storage });
const fileUpload = multer({ storage: filesStorage });

module.exports = { upload, fileUpload };
