const jwt = require("jsonwebtoken");
const { users } = require("../../models");

exports.authToken = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    console.log(header);
    const token = header && header.split(" ")[1];
    if (!header) {
      return res.send({
        status: 401,
        messsage: "Unauthorize",
      });
    }

    const userVerifiedId = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => {
        if (err) {
          return res.send({
            message: err.message,
          });
        }
        console.log(user);
        return user.id;
      }
    );

    req.userLogin = userVerifiedId.dataValues;
    next();
  } catch (err) {
    console.error(err);
  }
};
