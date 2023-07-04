const { Talent_Skills } = require("../../models");

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
