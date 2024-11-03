import moment from 'moment';

export const dateFormValidates = (inputs) => {
    const errors = {};
    const { date, time } = inputs;

    if (!date || !time) {
        errors.date = "You must select a date and time.";
    }

    const appointmentDate = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
    const now = moment();

    if (appointmentDate.isBefore(now)) {
        errors.date = "Appointments cannot be scheduled for past dates.";
    }

    const minAdvance = now.clone().add(24, "hours");
    if (appointmentDate.isBefore(minAdvance)) {
        errors.date = "Appointments must be scheduled at least 24 hours in advance.";
    }

    const dayOfWeek = appointmentDate.day();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        errors.date = "Appointments cannot be scheduled on weekends.";
    }

    const startHour = moment(appointmentDate.format("YYYY-MM-DD") + " 10:00", "YYYY-MM-DD HH:mm");
    const endHour = moment(appointmentDate.format("YYYY-MM-DD") + " 16:00", "YYYY-MM-DD HH:mm");
    if (!appointmentDate.isBetween(startHour, endHour, "minute", "[)")) {
        errors.time = "Appointments can only be scheduled between 10:00 and 16:00.";
    }

    return errors;
};
