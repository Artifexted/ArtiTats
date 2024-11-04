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
exports.validateCredentialService = exports.createCredentialService = void 0;
const CredentialRepository_1 = __importDefault(require("../repositories/CredentialRepository"));
const appDataSource_1 = require("../config/appDataSource");
const crypto_1 = __importDefault(require("crypto"));
const createCredentialService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = appDataSource_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    const hashedPassword = hashPassword(password);
    const credential = CredentialRepository_1.default.create({
        username,
        password: hashedPassword,
    });
    const savedCredential = yield queryRunner.manager.save(credential);
    yield queryRunner.commitTransaction();
    yield queryRunner.release();
    return savedCredential;
});
exports.createCredentialService = createCredentialService;
const validateCredentialService = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = hashPassword(password);
    return hash === hashedPassword;
});
exports.validateCredentialService = validateCredentialService;
const hashPassword = (password) => {
    return crypto_1.default.createHash("sha256").update(password).digest("hex");
};
