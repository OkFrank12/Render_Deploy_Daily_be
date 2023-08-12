"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const express_validator_1 = require("express-validator");
exports.validator = {
    registerValidator: [
        (0, express_validator_1.check)("name").withMessage("Please fill in this field").isLength({ min: 8 }),
        (0, express_validator_1.check)("email")
            .trim()
            .toLowerCase()
            .isEmail()
            .withMessage("Please enter your Email"),
        (0, express_validator_1.check)("password")
            .isLength({ min: 10 })
            .matches("/^[A-Za-z0-9 ., '!&]+$/")
            .withMessage("Password doesn't pass"),
    ],
    signInValidator: [
        (0, express_validator_1.check)("email").isEmail().withMessage("Please enter your Email"),
        (0, express_validator_1.check)("password").withMessage("Password doesn't pass"),
    ],
};
