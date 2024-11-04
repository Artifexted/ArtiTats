"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appDataSource_1 = require("../config/appDataSource");
const Credential_1 = require("../entities/Credential");
const CredentialRepository = appDataSource_1.AppDataSource.getRepository(Credential_1.Credential);
exports.default = CredentialRepository;
