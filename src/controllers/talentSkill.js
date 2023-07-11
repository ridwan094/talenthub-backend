const { Talent_Skills } = require("../../models");
const talent = require("../../models/talent");

exports.get = async (req, res) => {
  try {
    const talent_skills = await Talent_Skills.findAll();

    res.status(200).send({
      msg: "OK",
      data: talent_skills,
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
    const talant = await Talent_Skills.findAll({
      where: {
        talent_id: req.params.id,
      },
    });

    if (!talant) {
      return res.status(404).send({
        msg: "not found!",
      });
    }

    res.status(200).send({
      msg: "OK!",
      data: talant,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.post = async (req, res) => {
  try {
    const save = await Talent_Skills.create({
      talent_id: req.body.talent_id,
      skill_id: req.body.skill_id,
    });

    res.status(200).send({
      msg: "OK!",
      data: save,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};
