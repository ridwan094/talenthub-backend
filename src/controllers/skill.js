const { Skills } = require("../../models");

exports.get = async (req, res) => {
  try {
    const data = await Skills.findAll();
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

exports.getByID = async (req, res) => {
  try {
    const id = await Skills.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!id) {
      return res.status(404).send({
        msg: "data nof found!",
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

exports.post = async (req, res) => {
  try {
    const reqBody = req.body;
    const store = await Skills.create({
      skill_name: reqBody.skill_name,
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

exports.edit = async (req, res) => {
  try {
    const reqBody = req.body;
    const update = await Skills.update(
      {
        skill_name: reqBody.skill_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).send({
      msg: "OK!",
      data: update,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const del = await Skills.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!del) {
      return res.status(404).send({
        msg: "data not found!",
      });
    }
    res.status(200).send({
      msg: "OK!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};
