"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const validateUserRegister_1 = require("../middlewares/validateUserRegister");
const validateUserLogin_1 = require("../middlewares/validateUserLogin");
const router = (0, express_1.Router)();
router.get("/", usersController_1.default.getUsers);
router.get("/:id", usersController_1.default.getUserById);
router.post("/register", validateUserRegister_1.validateUserRegister, usersController_1.default.registerUser);
router.post("/login", validateUserLogin_1.validateLogin, usersController_1.default.loginUser);
router.delete("/", usersController_1.default.deleteUser);
exports.default = router;
