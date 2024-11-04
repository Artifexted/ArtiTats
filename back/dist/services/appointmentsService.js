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
exports.cancelAppointmentService = exports.scheduleAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentsService = void 0;
const appDataSource_1 = require("../config/appDataSource");
const Appointment_1 = require("../entities/Appointment");
const User_1 = require("../entities/User");
const IAppointment_1 = require("../interfaces/IAppointment");
const customError_1 = require("../utils/customError");
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield AppointmentRepository_1.default.find({ relations: ["user"] });
    if (appointments.length === 0)
        throw new customError_1.CustomErrors(404, "No appointments found.");
    else
        return appointments;
});
exports.getAppointmentsService = getAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield AppointmentRepository_1.default.findOne({ where: { id }, relations: ["user"] });
    return appointment || null;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const scheduleAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = appDataSource_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        const userRepository = queryRunner.manager.getRepository(User_1.User);
        const AppointmentRepositoryRunner = queryRunner.manager.getRepository(Appointment_1.Appointment);
        const user = yield userRepository.findOneBy({ id: appointmentData.userId });
        if (!user)
            throw new customError_1.CustomErrors(400, "User not found");
        AppointmentRepository_1.default.validateAllowAppointment(appointmentData.date, appointmentData.time);
        yield AppointmentRepository_1.default.validateExistingAppointment(appointmentData.userId, appointmentData.date, appointmentData.time);
        const newAppointment = AppointmentRepositoryRunner.create({
            date: appointmentData.date,
            time: appointmentData.time,
            user,
            status: IAppointment_1.Status.active
        });
        yield queryRunner.manager.save(newAppointment);
        yield queryRunner.commitTransaction();
        return newAppointment;
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        throw error;
    }
    finally {
        yield queryRunner.release();
    }
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield AppointmentRepository_1.default.findOne({ where: { id } });
    if (!appointment) {
        return null;
    }
    appointment.status = IAppointment_1.Status.cancelled;
    yield AppointmentRepository_1.default.save(appointment);
    return appointment;
});
exports.cancelAppointmentService = cancelAppointmentService;
