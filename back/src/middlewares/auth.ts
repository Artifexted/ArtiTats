import { Request, Response, NextFunction } from "express";
import { CustomErrors } from "../utils/customError";

const auth = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.headers;

    if (token == "autenticado") next()
    else throw new CustomErrors(400, "Error. Falta autenticación.");
}

export default auth