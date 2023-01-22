// const { User } = require("../../models");
// const { Unauthorized } = require("http-errors");
// const jwt = require("jsonwebtoken");

// const { SECRET_KEY } = process.env;

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: { name, email },
    },
  });
};
module.exports = getCurrent;
