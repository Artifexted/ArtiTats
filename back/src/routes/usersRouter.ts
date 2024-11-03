import { Router } from "express";
import usersController from "../controllers/usersController";
import { validateUserRegister } from "../middlewares/validateUserRegister";
import { validateLogin } from "../middlewares/validateUserLogin";

const router: Router = Router();

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserById);
router.post("/register", validateUserRegister, usersController.registerUser);
router.post("/login", validateLogin, usersController.loginUser);
router.delete("/", usersController.deleteUser);

export default router;
