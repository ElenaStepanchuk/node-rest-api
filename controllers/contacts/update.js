const contactsOperations = require("../../models/contacts.js");
const { NotFound } = require("http-errors");

const update = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.updateContact(contactId, req.body);
  if (!contact) {
    throw NotFound(`Contact width id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: contact },
  });
};
module.exports = update;
