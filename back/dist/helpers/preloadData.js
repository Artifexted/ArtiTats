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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadUserData = void 0;
const usersService_1 = require("../services/usersService");
const customError_1 = require("../utils/customError");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const userDemo = {
    name: "Testing User",
    email: "user@mail.com",
    birthdate: new Date("2000-04-28"),
    nDni: 41123456,
    credentials: {
        username: "testuser",
        password: "Pass123."
    }
};
const preloadUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserRepository_1.default.find();
    if (users.length) {
        console.log("Data preloading was not done because there is already existing data.");
        return;
    }
    try {
        yield (0, usersService_1.registerUserService)(userDemo);
        console.log("User preload completed successfully.");
    }
    catch (error) {
        console.error("Error preloading data:", error);
        throw new customError_1.CustomErrors(400, "Error preloading data");
    }
});
exports.preloadUserData = preloadUserData;
