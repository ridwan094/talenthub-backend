const { Talent } = require("../../models");
const path = require("path");
const fs = require("fs");
// const PDFDocument = require("pdfkit");

exports.get = async (req, res) => {
  try {
    const talents = await Talent.findAll({
      include: 'Skill'
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
      where: {
        id: req.params.id,
      },
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
      // cv =
      //   req.protocol +
      //   "://" +
      //   req.get("host") +
      //   "/" +
      //   cvFile.path.replace(/\\/g, "/");
      cv = cvFile.path.replace(/\\/g, "/");
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
    const talentId = req.params.id;

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
      // cv =
      //   req.protocol +
      //   "://" +
      //   req.get("host") +
      //   "/" +
      //   cvFile.path.replace(/\\/g, "/");
      cv = cvFile.path.replace(/\\/g, "/");
    }

    const talent = await Talent.findByPk(talentId);

    if (!talent) {
      return res.status(404).send({
        msg: "Talent not found",
      });
    }

    // Update the talent data
    talent.talent_name = reqBody.talent_name;
    talent.talent_image_path = image;
    talent.talent_summary = reqBody.talent_summary;
    talent.work_since = reqBody.work_since;
    talent.education = reqBody.education;
    talent.cv_file_path = cv;
    talent.working_status = reqBody.working_status;

    await talent.save();

    res.status(200).send({
      msg: "OK",
      data: talent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

exports.download = async (req, res) => {
  try {
    const talentId = req.params.id;
    const talent = await Talent.findByPk(talentId);

    if (!talent) {
      return res.status(404).send({
        msg: "Talent not found",
      });
    }

    const filePath = talent.cv_file_path;
    const fileName = path.basename(filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({
          msg: "Error downloading the file",
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = await Talent.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!id) {
      return res.status(404).send({
        msg: "not found!",
      });
    }

    let del = await Talent.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).send({
      msg: "deleted!",
    });
  } catch (err) {}
};

// exports.downloadPDF = async (req, res) => {
//   try {
//     const talentId = req.params.id;

//     const talent = await Talent.findByPk(talentId);

//     if (!talent || !talent.cv_file_path) {
//       return res.status(404).send({
//         msg: "CV file not found on server",
//       });
//     }

//     const cvFilePath = talent.cv_file_path;
//     const fileName = path.basename(cvFilePath);

//     res.download(cvFilePath, fileName, (err) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send({
//           msg: "Internal Server Error",
//         });
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({
//       msg: "Internal Server Error",
//     });
//   }
// };

// exports.downloadPDF = async (req, res) => {
//   try {
//     const talentId = req.params.id;

//     const talent = await Talent.findByPk(talentId);

//     if (!talent || !talent.cv_file_path) {
//       return res.status(404).send({
//         msg: "Talent or PDF file not found",
//       });
//     }

//     const filePath = path.join(__dirname, "../../", talent.cv_file_path);

//     res.sendFile(filePath);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({
//       msg: "Internal Server Error",
//     });
//   }
// };
