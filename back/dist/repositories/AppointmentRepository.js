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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appDataSource_1 = require("../config/appDataSource");
const Appointment_1 = require("../entities/Appointment");
const customError_1 = require("../utils/customError");
const moment_1 = __importDefault(require("moment"));
const AppointmentRepository = appDataSource_1.AppDataSource.getRepository(Appointment_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const appointmentDate = (0, moment_1.default)(`${date} ${time}`, "YYYY-MM-DD HH:mm");
        const now = (0, moment_1.default)();
        if (appointmentDate.isBefore(now)) {
            throw new customError_1.CustomErrors(400, `Appointments cannot be scheduled for past dates.`);
        }
        const minAdvance = now.clone().add(24, "hours");
        if (appointmentDate.isBefore(minAdvance)) {
            throw new customError_1.CustomErrors(400, `Appointments must be scheduled at least 24 hours in advance.`);
        }
        const dayOfWeek = appointmentDate.day();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new customError_1.CustomErrors(400, `Appointments cannot be scheduled on weekends.`);
        }
        const startHour = (0, moment_1.default)(appointmentDate.format("YYYY-MM-DD") + " 10:00", "YYYY-MM-DD HH:mm");
        const endHour = (0, moment_1.default)(appointmentDate.format("YYYY-MM-DD") + " 16:00", "YYYY-MM-DD HH:mm");
        if (!appointmentDate.isBetween(startHour, endHour, "minute", "[)")) {
            throw new customError_1.CustomErrors(400, `Appointments can only be scheduled between 10:00 and 16:00.`);
        }
    },
    validateExistingAppointment: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentFound = yield this.findOne({
                where: {
                    user: {
                        id: userId
                    },
                    date: date,
                    time: time
                }
            });
            if (appointmentFound)
                throw new customError_1.CustomErrors(400, `An appointment with date ${date} and time ${time} already exists for the user with ID ${userId}.`);
        });
    }
});
exports.default = AppointmentRepository;
