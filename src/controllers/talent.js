const { Talent, Skill } = require("../../models");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
// const PDFDocument = require("pdfkit");

// Fungsi untuk menghapus file gambar
function deleteImage(imagePath) {
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    console.log("Gambar lama dihapus:", imagePath);
  } else {
    console.log("Gambar lama tidak ditemukan:", imagePath);
  }
}

// Fungsi untuk menghapus file CV
function deleteCV(cvPath) {
  if (fs.existsSync(cvPath)) {
    fs.unlinkSync(cvPath);
    console.log("CV lama dihapus:", cvPath);
  } else {
    console.log("CV lama tidak ditemukan:", cvPath);
  }
}

exports.get = async (req, res) => {
  try {
    const talents = await Talent.findAll({
      include: "skill",
    });

    res.status(200).send({
      msg: "OK",
      data: talents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const talents = await Talent.findOne({
      include: "skill",
      where: {
        id: req.params.id,
      },
    });

    if (!talents) {
      return res.status(404).send({
        msg: "data not found!",
      });
    }

    res.status(200).send({
      msg: "OK",
      data: talents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

exports.post = async (req, res) => {
  try {
    const reqBody = req.body;

    let image, cv;

    if (req.files && req.files.talent_image_path) {
      const talentImage = req.files.talent_image_path[0];
      image =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        talentImage.path.replace(/\\/g, "/");
    }

    if (req.files && req.files.cv_file_path) {
      const cvFile = req.files.cv_file_path[0];
      cv =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        cvFile.path.replace(/\\/g, "/");
      // cv = cvFile.path.replace(/\\/g, "");
    }

    const save = await Talent.create({
      talent_name: reqBody.talent_name,
      talent_image_path: image,
      talent_summary: reqBody.talent_summary,
      work_since: reqBody.work_since,
      education: reqBody.education,
      cv_file_path: cv,
      working_status: reqBody.working_status,
    });

    console.log(save);
    res.status(200).send({
      msg: "OK",
      data: save,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const reqBody = req.body;

    let image, cv;

    if (req.files && req.files.talent_image_path) {
      const talentImage = req.files.talent_image_path[0];
      image =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        talentImage.path.replace(/\\/g, "");
    }

    if (req.files && req.files.cv_file_path) {
      const talentCv = req.files.cv_file_path[0];
      cv =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        talentCv.path.replace(/\\/g, "");
    }

    const talent = await Talent.findByPk(req.params.id);

    if (!talent) {
      return res.status(404).send({
        msg: "data not found!",
      });
    }

    // Menghapus gambar lama jika ada gambar baru yang diunggah
    if (image && talent.talent_image_path) {
      const oldImagePath = path.join(
        __dirname,
        "../../asset/img",
        getImageName(talent.talent_image_path)
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Gambar lama dihapus: ", oldImagePath);
      } else {
        console.log("Gambar lama tidak ditemukan: ", oldImagePath);
      }
    }

    // menghapus cv lama jika ada cv baru yang diunggah
    if (cv && talent.cv_file_path) {
      const oldCVPath = path.join(
        __dirname,
        "../../asset/img",
        getCVName(talent.cv_file_path)
      );
      if (fs.existsSync(oldCVPath)) {
        fs.unlinkSync(oldCVPath);
        console.log("CV lama dihapus: ", oldCVPath);
      } else {
        console.log("CV lama tidak ditemukan: ", oldCVPath);
      }
    }

    // update data
    talent.talent_name = reqBody.talent_name;
    talent.talent_image_path = image;
    talent.talent_summary = reqBody.talent_summary;
    talent.work_since = reqBody.work_since;
    talent.education = reqBody.education;
    talent.cv_file_path = cv;
    talent.working_status = reqBody.working_status;

    await talent.save();

    res.status(200).send({
      msg: "OK!",
      data: talent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

// Mendapatkan nama gambar dari URL
function getImageName(url) {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

// Mendapatkan nama CV dari URL
function getCVName(url) {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

exports.download = async (req, res) => {
  try {
    const talentId = req.params.id;
    const talent = await Talent.findByPk(talentId);

    if (!talent) {
      return res.status(404).send({
        msg: "Talent not found",
      });
    }

    console.log(talent);
    const fileUrl = talent.cv_file_path;
    const fileName = `CV_${talent.talent_name}.pdf`;

    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "stream",
    });

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const talentId = req.params.id;
    const talent = await Talent.findByPk(talentId);
    if (!talent) {
      return res.status(404).send({
        msg: "Talent not found",
      });
    }

    const image = talent.talent_image_path;
    const cv = talent.cv_file_path;

    console.log("berak: ", image);

    // Menghapus gambar lama jika ada gambar baru yang diunggah
    if (image) {
      const oldImagePath = path.join(
        __dirname,
        "../../asset/img",
        getImageName(image)
      );

      deleteImage(oldImagePath);
    }

    // Menghapus CV lama jika ada CV baru yang diunggah
    if (cv) {
      const oldCVPath = path.join(__dirname, "../../asset/img", getCVName(cv));
      deleteCV(oldCVPath);
    }

    // Menghapus data talent
    await Talent.destroy({
      where: {
        id: talentId,
      },
    });

    return res.status(200).send({
      msg: "deleted!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};
