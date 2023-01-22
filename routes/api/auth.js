const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const validateRegisterMiddleware = validation(joiRegisterSchema);
const validateLoginMiddleware = validation(joiLoginSchema);

const router = express.Router();

router.post(
  "/register",
  validateRegisterMiddleware,
  ctrlWrapper(ctrl.register)
);
router.post("/login", validateLoginMiddleware, ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
