import { Request, Response, NextFunction } from "express";
import { UserRegisterDto } from "../dto/UserDto";
import { CustomErrors } from "../utils/customError";

export const validateUserRegister = (req: Request<unknown, unknown, UserRegisterDto>, res: Response, next: NextFunction): void => {
    const { name, email, birthdate, nDni, credentials } = req.body;

    if (!name.trim()) {
        throw new CustomErrors(400, "Name is required");
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name)) {
        throw new CustomErrors(400, "Name must be a valid name.");
    }

    if (!email.trim()) {
        throw new CustomErrors(400, "Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        throw new CustomErrors(400, "Email is invalid");
    }

    if (!birthdate) {
        throw new CustomErrors(400, "Birthdate is required");
    } else {
        const today = new Date();
        const birthdateDate = new Date(birthdate);
        const age = today.getFullYear() - birthdateDate.getFullYear();
        const monthDiff = today.getMonth() - birthdateDate.getMonth();
        const dayDiff = today.getDate() - birthdateDate.getDate();

        if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            throw new CustomErrors(400, "User must be at least 18 years old");
        }
    }

    if (!nDni) {
        throw new CustomErrors(400, "nDni is required");
    } else if (isNaN(Number(nDni))) {
        throw new CustomErrors(400, "nDni must be a number");
    }

    const { username, password } = credentials;
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
