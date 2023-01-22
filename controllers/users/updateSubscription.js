const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res, err) => {
  const { id } = req.params;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { subscription },
    {
      new: true,
    }
  );
  if (!user) {
    throw new NotFound(`User width id=${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: { result: user },
  });
};
module.exports = updateSubscription;
