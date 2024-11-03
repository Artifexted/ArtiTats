import { Request, Response } from "express";
import { getAppointmentsService, getAppointmentByIdService, scheduleAppointmentService, cancelAppointmentService } from "../services/appointmentsService";
import AppointmentDto from "../dto/AppointmentDto";
import { catchingError } from "../utils/catchingErrors";
import { CustomErrors } from "../utils/customError";

const getAppointments = async (req: Request, res: Response): Promise<void> => {
    const appointments = await getAppointmentsService();

    if (appointments.length === 0) {
        throw new CustomErrors(404, "No appointments found");
    }

    res.status(200).json(appointments);
};

const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params as { id: string };
    const appointment = await getAppointmentByIdService(parseInt(id));

    if (!appointment) {
        throw new CustomErrors(404, "Appointment not found");
    }

    res.status(200).json(appointment);
};

const scheduleAppointment = async (req: Request, res: Response): Promise<void> => {
    const appointmentData = req.body as AppointmentDto;

    if (!appointmentData.date || !appointmentData.time || !appointmentData.userId) {
        throw new CustomErrors(400, "Data is missing to schedule the appointment");
    }

    const newAppointment = await scheduleAppointmentService(appointmentData);
    res.status(201).json(newAppointment);
};

const cancelAppointment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params as { id: string };
    const appointment = await cancelAppointmentService(parseInt(id));

    if (!appointment) {
        throw new CustomErrors(404, "Appointment not found");
    }
    res.status(200).json({ message: "Appointment cancelled successfully", appointment });
};

const appointmentsController = {
    getAppointments: catchingError(getAppointments),
    getAppointmentById: catchingError(getAppointmentById),
    scheduleAppointment: catchingError(scheduleAppointment),
    cancelAppointment: catchingError(cancelAppointment)
}

export default appointmentsController;