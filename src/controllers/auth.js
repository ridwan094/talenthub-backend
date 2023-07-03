const { users } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require(`dotenv`).config();

exports.login = async (req, res) => {
  try {
    const body = req.body;
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).send({
        status: 400,
        msg: error.details[0].message,
      });
    }

    const userData = await users.findOne({
      where: {
        email: body.email,
      },
    });

    if (!userData) {
      return res.status(400).send({
        status: 400,
        msg: `Email or Password Incorrect`,
      });
    }

    const matched = await bcrypt.compare(body.password, userData.password);

    if (!matched) {
      return res.status(400).send({
        status: 400,
        msg: `Email or Password Incorrect`,
      });
    }

    const result = await users.findOne({
      where: {
        email: body.email,
      },
      attributes: {
        exclude: [`password`],
      },
    });

    const accessToken = jwt.sign(
      {
        id: result.id,
        email: result.email,
        role: result.role,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).send({
      status: 200,
      msg: `OK`,
      token: accessToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 500,
      msg: `Internal Server Error`,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const body = req.body;
    const schema = joi.object({
      fullname: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).send({
        status: 400,
        msg: error.details[0].message,
      });
    }

    const emailExisted = await users.findOne({
      where: {
        email: body.email,
      },
    });

    if (emailExisted) {
      return res.status(400).send({
        status: 400,
        msg: "Email Already Existed!",
      });
    }

    const encrypt = await bcrypt.hash(body.password, 12);

    const newUser = await users.create({
      fullname: body.fullname,
      email: body.email,
      password: encrypt,
      role: "user",
    });

    res.status(200).send({
      status: 200,
      msg: `OK`,
      data: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 500,
      msg: `Internal Server Error`,
    });
  }
};
