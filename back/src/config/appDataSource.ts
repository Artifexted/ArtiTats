import { DataSource } from "typeorm";
import { DB_DATABASE, DB_DROP, DB_ENTITIES, DB_HOST, DB_LOGGING, DB_PASSWORD, DB_PORT, DB_SYNC, DB_TYPE, DB_USERNAME } from "./envs";

export const AppDataSource = new DataSource({
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    dropSchema: DB_DROP, // Para eliminar los datos y reestructurar la tabla
    synchronize: DB_SYNC,
    logging: DB_LOGGING,
    entities: DB_ENTITIES,
    subscribers: [],
    migrations: [],
})
