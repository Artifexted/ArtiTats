import { Router } from "express";
import appointmentsController from "../controllers/appointmentsController";

const router: Router = Router();

router.get("/", appointmentsController.getAppointments);
router.get("/:id", appointmentsController.getAppointmentById);
router.post("/schedule", appointmentsController.scheduleAppointment);
router.put("/cancel/:id", appointmentsController.cancelAppointment);

export default router;
