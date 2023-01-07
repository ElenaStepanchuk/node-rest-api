const contactsOperations = require("../../models/contacts.js");

const add = async (req, res) => {
  const contact = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: contact },
  });
};

module.exports = add;
