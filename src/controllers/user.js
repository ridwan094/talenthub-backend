const { users } = require("../../models");
const bcrypt = require("bcrypt");

exports.get = async (req, res) => {
  try {
    const user = await users.findAll();
    res.status(200).send({
      msg: "OK!",
      data: user,
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
    const hash = await bcrypt.hash(req.body.password, 10);

    const email = await users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.status(400).send({
        msg: "email already in use!",
      });
    }

    const save = await users.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });
    res.status(200).send({
      msg: "OK!",
      data: save,
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
    const hash = await bcrypt.hash(req.body.password, 10);
    const update = await users.update(
      {
        fullname: req.body.fullname,
        email: req.body.email,
        password: hash,
        role: req.body.role,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!update) {
      return res.status(404).send({
        msg: "data not found!",
      });
    }
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
    const del = await users.destroy({
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
      smg: "OK!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
};
