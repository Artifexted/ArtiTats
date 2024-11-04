"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentsService_1 = require("../services/appointmentsService");
const catchingErrors_1 = require("../utils/catchingErrors");
const customError_1 = require("../utils/customError");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield (0, appointmentsService_1.getAppointmentsService)();
    if (appointments.length === 0) {
        throw new customError_1.CustomErrors(404, "No appointments found");
    }
    res.status(200).json(appointments);
});
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const appointment = yield (0, appointmentsService_1.getAppointmentByIdService)(parseInt(id));
    if (!appointment) {
        throw new customError_1.CustomErrors(404, "Appointment not found");
    }
    res.status(200).json(appointment);
});
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentData = req.body;
    if (!appointmentData.date || !appointmentData.time || !appointmentData.userId) {
        throw new customError_1.CustomErrors(400, "Data is missing to schedule the appointment");
    }
    const newAppointment = yield (0, appointmentsService_1.scheduleAppointmentService)(appointmentData);
    res.status(201).json(newAppointment);
});
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const appointment = yield (0, appointmentsService_1.cancelAppointmentService)(parseInt(id));
    if (!appointment) {
        throw new customError_1.CustomErrors(404, "Appointment not found");
    }
    res.status(200).json({ message: "Appointment cancelled successfully", appointment });
});
const appointmentsController = {
    getAppointments: (0, catchingErrors_1.catchingError)(getAppointments),
    getAppointmentById: (0, catchingErrors_1.catchingError)(getAppointmentById),
    scheduleAppointment: (0, catchingErrors_1.catchingError)(scheduleAppointment),
    cancelAppointment: (0, catchingErrors_1.catchingError)(cancelAppointment)
};
exports.default = appointmentsController;
