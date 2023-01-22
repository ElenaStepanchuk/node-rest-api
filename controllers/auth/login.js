const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  console.log("SECRET_KEY:", SECRET_KEY);
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "3h",
  });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};
module.exports = login;
