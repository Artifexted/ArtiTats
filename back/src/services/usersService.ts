import { QueryRunner } from "typeorm";
import { AppDataSource } from "../config/appDataSource";
import UserRepository from "../repositories/UserRepository";
import CredentialRepository from "../repositories/CredentialRepository";
import { UserLoginDTO, UserRegisterDto } from "../dto/UserDto";
import { User } from "../entities/User";
import { createCredentialService, validateCredentialService } from "./credentialsService";
import { CustomErrors } from "../utils/customError";

export const registerUserService = async (userData: UserRegisterDto): Promise<User> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const usernameFound = await CredentialRepository.findOne({
        where: { username: userData.credentials.username },
        relations: ["user"],
    });

    const emailOrDniFound = await UserRepository.checkByEmailOrNDni(userData.email, userData.nDni);
    if(emailOrDniFound) throw new CustomErrors(400, "The email or ID are already registered.");

    if(usernameFound) throw new CustomErrors(400, "The username is already registered.");

    const savedCredential = await createCredentialService(userData.credentials.username, userData.credentials.password);

    const user = UserRepository.create({
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credential: savedCredential,
    });
    const savedUser = await queryRunner.manager.save(user);

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return savedUser;
};

export const loginUserService = async (loginData: UserLoginDTO): Promise<User> => {
    const credential = await CredentialRepository.findOne({
        where: { username: loginData.username },
        relations: ["user"],
    });

    if (!credential || !credential.user) {
        throw new CustomErrors(400, "User not found.");
    }

    const isValid = await validateCredentialService(loginData.password, credential.password);
    if (!isValid) {
        throw new CustomErrors(400, "Invalid credentials.");
    }

    return credential.user;
};

export const getUsersService = async (): Promise<User[]> => {
    return await UserRepository.find({ relations: ["credential"] });
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
    const user = await UserRepository.findById(id);

    if(!user) throw new CustomErrors(404, `User with ID ${id} was not found.`);
    return user;
};

export const deleteUserService = async (id: number): Promise<void> => {
    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = await UserRepository.findById(id);
    if (!user) {
        throw new CustomErrors(404, `User with ID ${id} was not found`);
    }

    if (user.credential) {
        await queryRunner.manager.delete(CredentialRepository.target, { id: user.credential.id });
    }

    await queryRunner.manager.delete(UserRepository.target, { id: user.id });
    await queryRunner.commitTransaction();
    await queryRunner.release();
};
