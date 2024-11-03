import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/appDataSource";
import { preloadUserData } from "./helpers/preloadData";

const initializeApp = async() => {
    await AppDataSource.initialize();

    await preloadUserData();
    server.listen(PORT, () => {
        console.log(`Server escuchando el puerto ${PORT}`);
    })
}

initializeApp();