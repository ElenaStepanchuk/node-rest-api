const contactsOperations = require("../../models/contacts.js");
const { NotFound } = require("http-errors");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.removeContact(contactId);
  if (!contact) {
    throw NotFound(`Contact width id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id=${contactId} deleted.`,
    data: { result: contact },
  });
};

module.exports = remove;
