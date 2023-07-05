const { seniority } = require("../../models");

exports.get = async (req, res) => {
  try {
    const data = await seniority.findAll();
    res.status(200).send({
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

exports.post = async (req, res) => {
  try {
    const save = await seniority.create({
      name: req.body.name,
    });
    res.status(200).send({
      msg: "OK!",
      data: save,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.delete = async (req, res) => {
  try {
    del = await seniority.destroy({
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
  }
};
