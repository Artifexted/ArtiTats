import { registerUserService } from "../services/usersService";
import { UserRegisterDto } from "../dto/UserDto";
import { CustomErrors } from "../utils/customError";
import UserRepository from "../repositories/UserRepository";

const userDemo: UserRegisterDto = {
    name: "Testing User",
    email: "user@mail.com",
    birthdate: new Date("2000-04-28"),
    nDni: 41123456,
    credentials: {
        username: "testuser",
        password: "Pass123."
    }
};

export const preloadUserData = async () => {
    const users = await UserRepository.find();
    if (users.length) {
        console.log("Data preloading was not done because there is already existing data.");
        return;
    }

    try {
        await registerUserService(userDemo);
        console.log("User preload completed successfully.");
    } catch (error) {
        console.error("Error preloading data:", error);
        throw new CustomErrors(400, "Error preloading data");
    }
};
