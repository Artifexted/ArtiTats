import { AppDataSource } from "../config/appDataSource";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import AppointmentDto from "../dto/AppointmentDto";
import { Status } from "../interfaces/IAppointment";
import { QueryRunner } from "typeorm";
import { CustomErrors } from "../utils/customError";
import AppointmentRepository from "../repositories/AppointmentRepository";

export const getAppointmentsService = async (): Promise<Appointment[]> => {
    const appointments = await AppointmentRepository.find({ relations: ["user"] });
    if(appointments.length === 0) throw new CustomErrors(404, "No appointments found.");
    else return appointments;
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
    const appointment = await AppointmentRepository.findOne({ where: { id }, relations: ["user"] });
    return appointment || null;
};

export const scheduleAppointmentService = async (appointmentData: AppointmentDto): Promise<Appointment> => {
    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const userRepository = queryRunner.manager.getRepository(User);
        const AppointmentRepositoryRunner = queryRunner.manager.getRepository(Appointment);

        const user = await userRepository.findOneBy({ id: appointmentData.userId });
        if (!user) throw new CustomErrors(400, "User not found");

        AppointmentRepository.validateAllowAppointment(appointmentData.date, appointmentData.time);
        await AppointmentRepository.validateExistingAppointment(appointmentData.userId, appointmentData.date, appointmentData.time)

        const newAppointment = AppointmentRepositoryRunner.create({
            date: appointmentData.date,
            time: appointmentData.time,
            user,
            status: Status.active
        });

        await queryRunner.manager.save(newAppointment);
        await queryRunner.commitTransaction();

        return newAppointment;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    } finally {
        await queryRunner.release();
    }
};

export const cancelAppointmentService = async (id: number): Promise<Appointment | null> => {
    const appointment = await AppointmentRepository.findOne({ where: { id } });

    if (!appointment) {
        return null;
    }

    appointment.status = Status.cancelled;
    await AppointmentRepository.save(appointment);

    return appointment;
};
