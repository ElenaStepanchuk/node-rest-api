const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateStatusContact = async (req, res, err) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!contact) {
    throw new NotFound(`Contact width id=${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: { result: contact },
  });
};
module.exports = updateStatusContact;
