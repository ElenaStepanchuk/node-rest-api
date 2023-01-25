const express = require("express");

const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");
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
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
