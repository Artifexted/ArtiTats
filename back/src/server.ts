/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";
import { ErrorResponse, PostgresError } from "./interfaces/IError";

const server: Application = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
server.use(router);

server.use((err: unknown, req: Request, res: Response, next: NextFunction): void => {
    const error = err as PostgresError

    const errorMessage: ErrorResponse = {
        message: "Error del servidor",
        details: err instanceof Error ? error.detail ? error.detail : err.message : "Error desconocido",
        code: error.code
    };

    if (error.code === 404) res.status(404).json({ message: errorMessage.message, details: errorMessage.details })
    else res.status(400).json(errorMessage);
})

export default server;