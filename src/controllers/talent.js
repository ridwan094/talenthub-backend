const { Talent } = require("../../models");

exports.get = async (req, res) => {
  try {
    const talents = await Talent.findAll();
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
      image = req.protocol + "://" + req.get("host") + "/" + talentImage.path;
    }

    if (req.files && req.files.cv_file_path) {
      const cvFile = req.files.cv_file_path[0];
      cv = req.protocol + "://" + req.get("host") + "/" + cvFile.path;
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
