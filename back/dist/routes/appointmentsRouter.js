"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = __importDefault(require("../controllers/appointmentsController"));
const router = (0, express_1.Router)();
router.get("/", appointmentsController_1.default.getAppointments);
router.get("/:id", appointmentsController_1.default.getAppointmentById);
router.post("/schedule", appointmentsController_1.default.scheduleAppointment);
router.put("/cancel/:id", appointmentsController_1.default.cancelAppointment);
exports.default = router;
