const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const update = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw new NotFound(`Contact width id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: contact },
  });
};
module.exports = update;
