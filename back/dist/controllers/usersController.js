"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersService_1 = require("../services/usersService");
const catchingErrors_1 = require("../utils/catchingErrors");
const customError_1 = require("../utils/customError");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, credentials } = req.body;
    yield (0, usersService_1.registerUserService)({ name, email, birthdate, nDni, credentials });
    res.status(201).json({ message: "Registrado correctamente." });
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield (0, usersService_1.loginUserService)({ username, password });
    res.status(200).json({
        login: true,
        user
    });
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, usersService_1.getUsersService)();
    res.status(200).json(users);
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield (0, usersService_1.getUserByIdService)(parseInt(id));
    if (!user) {
        throw new customError_1.CustomErrors(404, "User not found");
    }
    res.status(200).json(user);
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield (0, usersService_1.deleteUserService)(id);
    res.status(200).json({ message: "User succesfully deleted." });
});
const usersController = {
    registerUser: (0, catchingErrors_1.catchingError)(registerUser),
    loginUser: (0, catchingErrors_1.catchingError)(loginUser),
    getUsers: (0, catchingErrors_1.catchingError)(getUsers),
    getUserById: (0, catchingErrors_1.catchingError)(getUserById),
    deleteUser: (0, catchingErrors_1.catchingError)(deleteUser)
};
exports.default = usersController;
