const { Schema, model } = require("mongoose");
const Joi = require("joi");

const regEmail =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name not correct"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email not correct"],
      minlength: 3,
      maxlength: 50,
      unique: true,
      match: regEmail,
    },
    phone: {
      type: String,
      required: [true, "phone not correct"],
      minlength: 7,
      maxlength: 25,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().pattern(regEmail).required(),
  phone: Joi.string().min(7).max(20).required(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, favoriteJoiSchema };
