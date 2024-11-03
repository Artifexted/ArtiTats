import { AppDataSource } from "../config/appDataSource";
import { Appointment } from "../entities/Appointment";
import { CustomErrors } from "../utils/customError";
import moment from "moment";

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
    validateAllowAppointment: function (date: Date, time: string): void {
        const appointmentDate = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
        const now = moment();

        if (appointmentDate.isBefore(now)) {
            throw new CustomErrors(400, `Appointments cannot be scheduled for past dates.`);
        }

        const minAdvance = now.clone().add(24, "hours");
        if (appointmentDate.isBefore(minAdvance)) {
            throw new CustomErrors(400, `Appointments must be scheduled at least 24 hours in advance.`);
        }

        const dayOfWeek = appointmentDate.day();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new CustomErrors(400, `Appointments cannot be scheduled on weekends.`);
        }

        const startHour = moment(appointmentDate.format("YYYY-MM-DD") + " 10:00", "YYYY-MM-DD HH:mm");
        const endHour = moment(appointmentDate.format("YYYY-MM-DD") + " 16:00", "YYYY-MM-DD HH:mm");
        if (!appointmentDate.isBetween(startHour, endHour, "minute", "[)")) {
            throw new CustomErrors(400, `Appointments can only be scheduled between 10:00 and 16:00.`);
        }
    },

    validateExistingAppointment: async function (userId: number, date: Date, time: string): Promise<void> {
        const appointmentFound = await this.findOne({
            where: {
                user: {
                    id: userId
                },
                date: date,
                time: time
            }
        });

        if (appointmentFound) throw new CustomErrors(400, `An appointment with date ${date} and time ${time} already exists for the user with ID ${userId}.`);
    }
});

export default AppointmentRepository;
