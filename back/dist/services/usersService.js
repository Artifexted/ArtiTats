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
exports.deleteUserService = exports.getUserByIdService = exports.getUsersService = exports.loginUserService = exports.registerUserService = void 0;
const appDataSource_1 = require("../config/appDataSource");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const CredentialRepository_1 = __importDefault(require("../repositories/CredentialRepository"));
const credentialsService_1 = require("./credentialsService");
const customError_1 = require("../utils/customError");
const registerUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = appDataSource_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    const usernameFound = yield CredentialRepository_1.default.findOne({
        where: { username: userData.credentials.username },
        relations: ["user"],
    });
    const emailOrDniFound = yield UserRepository_1.default.checkByEmailOrNDni(userData.email, userData.nDni);
    if (emailOrDniFound)
        throw new customError_1.CustomErrors(400, "The email or ID are already registered.");
    if (usernameFound)
        throw new customError_1.CustomErrors(400, "The username is already registered.");
    const savedCredential = yield (0, credentialsService_1.createCredentialService)(userData.credentials.username, userData.credentials.password);
    const user = UserRepository_1.default.create({
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credential: savedCredential,
    });
    const savedUser = yield queryRunner.manager.save(user);
    yield queryRunner.commitTransaction();
    yield queryRunner.release();
    return savedUser;
});
exports.registerUserService = registerUserService;
const loginUserService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = yield CredentialRepository_1.default.findOne({
        where: { username: loginData.username },
        relations: ["user"],
    });
    if (!credential || !credential.user) {
        throw new customError_1.CustomErrors(400, "User not found.");
    }
    const isValid = yield (0, credentialsService_1.validateCredentialService)(loginData.password, credential.password);
    if (!isValid) {
        throw new customError_1.CustomErrors(400, "Invalid credentials.");
    }
    return credential.user;
});
exports.loginUserService = loginUserService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserRepository_1.default.find({ relations: ["credential"] });
});
exports.getUsersService = getUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserRepository_1.default.findById(id);
    if (!user)
        throw new customError_1.CustomErrors(404, `User with ID ${id} was not found.`);
    return user;
});
exports.getUserByIdService = getUserByIdService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = appDataSource_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    const user = yield UserRepository_1.default.findById(id);
    if (!user) {
        throw new customError_1.CustomErrors(404, `User with ID ${id} was not found`);
    }
    if (user.credential) {
        yield queryRunner.manager.delete(CredentialRepository_1.default.target, { id: user.credential.id });
    }
    yield queryRunner.manager.delete(UserRepository_1.default.target, { id: user.id });
    yield queryRunner.commitTransaction();
    yield queryRunner.release();
});
exports.deleteUserService = deleteUserService;
