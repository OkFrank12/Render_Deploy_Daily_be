import { check } from "express-validator";

export const validator = {
  registerValidator: [
    check("name").withMessage("Please fill in this field").isLength({ min: 8 }),
    check("email")
      .trim()
      .toLowerCase()
      .isEmail()
      .withMessage("Please enter your Email"),
    check("password")
      .isLength({ min: 10 })
      .matches("/^[A-Za-z0-9 ., '!&]+$/")
      .withMessage("Password doesn't pass"),
  ],

  signInValidator: [
    check("email").isEmail().withMessage("Please enter your Email"),
    check("password").withMessage("Password doesn't pass"),
  ],
};
