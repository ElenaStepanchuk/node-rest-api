const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSubscriptionSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();
const validateSubscription = validation(joiSubscriptionSchema);

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/:id/subscription",
  auth,
  validateSubscription,
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
