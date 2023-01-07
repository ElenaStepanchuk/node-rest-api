const express = require("express");
const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");
const Joi = require("joi");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(20).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw NotFound(`Contact width id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const contact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
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
  } catch (error) {
    next(error);
  }
});

module.exports = router;
