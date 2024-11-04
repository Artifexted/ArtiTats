"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const customError_1 = require("../utils/customError");
const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    if (!username.trim()) {
        throw new customError_1.CustomErrors(400, "Username is required.");
    }
    else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        throw new customError_1.CustomErrors(400, "Username has invalid characters.");
    }
    if (!password.trim()) {
        throw new customError_1.CustomErrors(400, "Password is required");
    }
    else if (password.length < 7) {
        throw new customError_1.CustomErrors(400, "Password must be at least 7 characters long.");
    }
    else if (!/[A-Z]/.test(password)) {
        throw new customError_1.CustomErrors(400, "Password must contain at least one uppercase letter.");
    }
    else if (!/[0-9]/.test(password)) {
        throw new customError_1.CustomErrors(400, "Password must contain at least one number.");
    }
    else if (!/[^A-Za-z0-9]/.test(password)) {
        throw new customError_1.CustomErrors(400, "Password must contain at least one special character.");
    }
    next();
};
exports.validateLogin = validateLogin;
