import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Credential } from "./Credential";

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: "date",
        nullable: false
    })
    birthdate: Date;

    @Column({
        type: "integer",
        nullable: false,
        unique: true
    })
    nDni: number;

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments: Appointment[];

    @OneToOne(() => Credential, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn()
    credential: Credential;
}