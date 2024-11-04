"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: envs_1.DB_TYPE,
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USERNAME,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_DATABASE,
    dropSchema: envs_1.DB_DROP, // Para eliminar los datos y reestructurar la tabla
    synchronize: envs_1.DB_SYNC,
    logging: envs_1.DB_LOGGING,
    entities: envs_1.DB_ENTITIES,
    subscribers: [],
    migrations: [],
});
