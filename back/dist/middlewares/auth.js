"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../utils/customError");
const auth = (req, res, next) => {
    const { token } = req.headers;
    if (token == "autenticado")
        next();
    else
        throw new customError_1.CustomErrors(400, "Error. Falta autenticación.");
};
exports.default = auth;
