import { Request, Response, NextFunction } from "express";
import { UserLoginDTO } from "../dto/UserDto";
import { CustomErrors } from "../utils/customError";

export const validateLogin = (req: Request<unknown, unknown, UserLoginDTO>, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;

    if (!username.trim()) {
        throw new CustomErrors(400, "Username is required.");
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        throw new CustomErrors(400, "Username has invalid characters.");
    }

    if (!password.trim()) {
        throw new CustomErrors(400, "Password is required");
    } else if (password.length < 7) {
        throw new CustomErrors(400, "Password must be at least 7 characters long.");
    } else if (!/[A-Z]/.test(password)) {
        throw new CustomErrors(400, "Password must contain at least one uppercase letter.");
    } else if (!/[0-9]/.test(password)) {
        throw new CustomErrors(400, "Password must contain at least one number.");
    } else if (!/[^A-Za-z0-9]/.test(password)) {
        throw new CustomErrors(400, "Password must contain at least one special character.");
    }

    next();
};
