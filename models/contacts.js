const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const result = await fs.readFile(contactPath);
  const contacts = JSON.parse(result);
  if (!contacts) {
    return null;
  }
  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();
  const contact = contacts.find((data) => data.id === id);
  return contact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const removeContact = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return removeContact;
}

async function addContact(data) {
  const contacts = await listContacts();
  const id = uuidv4();
  const contact = { id, ...data };
  contacts.push(contact);
  return await fs.writeFile(contactPath, JSON.stringify(contacts));
}

async function updateContact(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
