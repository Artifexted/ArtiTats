import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Status } from "../interfaces/IAppointment";

@Entity({
    name: "appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date", nullable: false })
    date: Date;

    @Column({ type: "varchar", length: 5, nullable: false })
    time: string;

    @Column({ type: "varchar", length: 10, nullable: false, default: Status.active })
    status: Status;

    @ManyToOne(() => User, user => user.appointments)
    user: User;
}
