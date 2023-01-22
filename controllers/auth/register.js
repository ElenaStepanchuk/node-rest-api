const { User } = require("../../models");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const newUser = new User({ name, email });
    newUser.serPassword(password);
    newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          name,
          email,
        },
      },
    });
  }
  throw new Conflict(`User with ${email} already exist`);
};
module.exports = register;
