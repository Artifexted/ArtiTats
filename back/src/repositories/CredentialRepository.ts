import { AppDataSource } from "../config/appDataSource";
import { Credential } from "../entities/Credential";

const CredentialRepository = AppDataSource.getRepository(Credential);

export default CredentialRepository;