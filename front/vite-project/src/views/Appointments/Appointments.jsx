/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import Appointment from "../../components/Appointment/Appointment";
import styles from "./Appointments.module.css";
import { UsersContext } from "../../context/UsersContext";
import AppointmentsNotFound from "./AppointmentsNotFound"

function Appointments() {
	const { getUserAppointments, user, userAppointments } = useContext(UsersContext);

	useEffect(() => {
		getUserAppointments(user)
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>My Appointments</h1>
			<div className={styles.appointmentsContainer}>
				{userAppointments.length > 0 ? (
					userAppointments.map((appointment) => (
						<Appointment
							key={appointment.id}
							id={appointment.id}
							date={appointment.date}
							time={appointment.time}
							status={appointment.status}
						/>
					))
				) : (
					<AppointmentsNotFound />
				)}
			</div>
		</div>
	);
}

export default Appointments;
