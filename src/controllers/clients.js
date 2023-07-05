const { Clients } = require('../../models');
const path = require('path');
const fs = require('fs');
const e = require('cors');

// Fungsi untuk menghapus file gambar
function deleteImage(imagePath) {
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    console.log('Gambar lama dihapus:', imagePath);
  } else {
    console.log('Gambar lama tidak ditemukan:', imagePath);
  }
}

exports.get = async (req, res) => {
  try {
    const clients = await Clients.findAll();

    res.status(200).send({
      msg: 'OK',
      data: clients,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: 'Internal Server Error',
    });
  }
}

exports.getById = async (req, res) => {
  try {
    const clients = await Clients.findOne({
      where: { id: req.params.id },
    });

    if (!clients) {
      return res.status(404).send({
        msg: 'data not found!',
      });
    }

    res.status(200).send({
      msg: 'OK',
      data: clients,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: 'Internal Server Error',
    });
  }
}

exports.post = async (req, res) => {
  try {
    const reqBody = req.body;

    let image;

    if (req.files && req.files.image_path) {
      const clientsImage = req.files.image_path[0];
      image =
        req.protocol +
        '://' +
        req.get('host') +
        "/" +
        clientsImage.path.replace(/\\/g, "/");
    }

    const save = await Clients.create({
      company_name: reqBody.company_name,
      image_path: image,
    });

    console.log(save);
    res.status(200).send({
      msg: 'OK',
      data: save,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: 'Internal Server Error',
    });
  }
}

exports.edit = async (req, res) => {
  try {
    const reqBody = req.body;
    const clientsId = req.params.id;

    let image;

    if (req.files && req.files.image_path) {
      const clientsImage = req.files.image_path[0];
      image =
        req.protocol +
        '://' +
        req.get('host') +
        '/' +
        clientsImage.path.replace(/\\/g, '/');
    }

    const clients = await Clients.findByPk(clientsId);

    if (!clients) {
      return res.status(404).send({
        msg: 'data not found!',
      });
    }

    // Menghapus gambar lama jika ada gambar baru yang diunggah
    if (image && clients.image_path) {
      const oldImagePath = path.join(
        __dirname,
        '../../asset/img',
        getImageName(clients.image_path)
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log('Gambar lama dihapus:', oldImagePath);
      } else {
        console.log('Gambar lama tidak ditemukan:', oldImagePath);
      }
    }

    // update data clients
    clients.company_name = reqBody.company_name;
    clients.image_path = image;

    await clients.save();

    res.status(200).send({
      msg: 'OK',
      data: clients,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: 'Internal Server Error',
    });
  }
};


// Mendapatkan nama gambar dari URL
function getImageName(imageUrl) {
  const urlParts = imageUrl.split('/');
  return urlParts[urlParts.length - 1];
}

exports.delete = async (req, res) => {
  try {
    const clientsId = req.params.id;
    const clients = await Clients.findByPk(clientsId);

    if (!clients) {
      return res.status(404).send({
        msg: 'data not found!',
      });
    }

    const image = clients.image_path;

    // Menghapus gambar lama jika ada gambar baru yang diunggah
    if (image) {
      const oldImagePath = path.join(
        __dirname,
        '../../asset/img',
        getImageName(image)
      );
      deleteImage(oldImagePath);
    }

    // Menghapus data clients
    await clients.destroy({
      where: {
        id: clientsId
      },
    });

    return res.status(200).send({
      msg: "deleted!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};
