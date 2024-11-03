import CredentialRepository from "../repositories/CredentialRepository";
import { Credential } from "../entities/Credential";
import { AppDataSource } from "../config/appDataSource";
import crypto from "crypto";

export const createCredentialService = async (username: string, password: string): Promise<Credential> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const hashedPassword = hashPassword(password);
    const credential = CredentialRepository.create({
        username,
        password: hashedPassword,
    });

    const savedCredential = await queryRunner.manager.save(credential);
    await queryRunner.commitTransaction();
    await queryRunner.release();

    return savedCredential;
};

export const validateCredentialService = async (password: string, hashedPassword: string): Promise<boolean> => {
    const hash = hashPassword(password);
    return hash === hashedPassword;
};

const hashPassword = (password: string): string => {
    return crypto.createHash("sha256").update(password).digest("hex");
};
