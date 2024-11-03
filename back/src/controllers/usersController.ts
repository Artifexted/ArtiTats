import { Request, Response } from "express";
import { registerUserService, deleteUserService, getUserByIdService, getUsersService, loginUserService } from "../services/usersService";
import { UserLoginDTO, UserRegisterDto } from "../dto/UserDto";
import { catchingError } from "../utils/catchingErrors";
import { CustomErrors } from "../utils/customError";

const registerUser = async (req: Request<unknown, unknown, UserRegisterDto>, res: Response): Promise<void> => {
    const { name, email, birthdate, nDni, credentials } = req.body;

    await registerUserService({ name, email, birthdate, nDni, credentials });
    res.status(201).json({message: "Registrado correctamente."});
};

const loginUser = async (req: Request<unknown, unknown, UserLoginDTO>, res: Response): Promise<void> => {
    const { username, password } = req.body;

    const user = await loginUserService({ username, password });
    res.status(200).json({
        login: true,
        user
    });
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await getUsersService();
    res.status(200).json(users);
};

const getUserById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await getUserByIdService(parseInt(id));

    if (!user) {
        throw new CustomErrors(404, "User not found");
    }

    res.status(200).json(user);
};

const deleteUser = async (req: Request<unknown, unknown, { id: number }>, res: Response): Promise<void> => {
    const { id } = req.body;
    await deleteUserService(id);
    res.status(200).json({ message: "User succesfully deleted." });
};

const usersController = {
    registerUser: catchingError(registerUser),
    loginUser: catchingError(loginUser),
    getUsers: catchingError(getUsers),
    getUserById: catchingError(getUserById),
    deleteUser: catchingError(deleteUser)
}

export default usersController;