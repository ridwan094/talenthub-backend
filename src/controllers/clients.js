const exp = require("constants");
const { clients } = require("../../models");
const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan untuk menghandle uploada file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});

// Middleware multer untuk mengunggah file
const upload = multer({ storage: storage }).single("client_image");

// Mendapatkan semua data clients
exports.getAllClients = async (req, res) => {
  try {
    const data = await clients.findAll();
    return res.status(200).send({
      msg: "OK!",
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

// Mendapatkan data client berdasarkan ID
exports.getClientByID = async (req, res) => {
  try {
    const id = await clients.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!id) {
      return res.status(404).send({
        msg: "Data not found!",
      });
    }
    return res.status(200).send({
      msg: "OK!",
      data: id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

// Membuat data client baru
exports.createClient = async (req, res) => {
  const { company_name, image_path } = req.body;
  try {
    const store = await clients.create({
      company_name: company_name,
      image_path: image_path,
    });
    res.status(200).send({
      msg: "OK!",
      data: store,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

// Mengupdate data client berdasarkan ID
exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const { company_name, image_path } = req.body;
  try {
    const client = await clients.findByPk(id);
    if (!client) {
      client.company_name = company_name;
      client.image_path = image_path;
      await client.save();
      res.json(client);
    } else {
      res.status(404).json({
        msg: "Data not found!",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

// Menghapus data client berdasarkan ID
exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clients.findByPk(id);
    if (!client) {
      await client.destroy();
      res.json({
        msg: "Data deleted!",
      });
    } else {
      res.status(404).json({
        msg: "Data not found!",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

// Upload image client
exports.uploadImage = async (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send({
        msg: "Internal Server Error",
      });
    } else if (err) {
      res.status(500).send({
        msg: "Internal Server Error",
      });
    }
    res.status(200).send({
      msg: "OK!",
      data: req.file,
    });
  });
};
