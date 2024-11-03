import { AppDataSource } from "../config/appDataSource";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User).extend({
    findById: async function (id: number): Promise<User | null> {
        const user = await this.findOne({ where: { id }, relations: ["credential", "appointments"] });
        if(user) return user;
        else return null;
    },

    checkById: async function (id: number): Promise<boolean> {
        const user = await this.findById(id)
        return !!user;
    },

    checkByEmailOrNDni: async function (email: string, nDni: number): Promise<boolean> {
        const user = await this.findOne({ where: [{ email }, { nDni }] });
        return !!user;
    }
});

export default UserRepository;