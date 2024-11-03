import PropTypes from "prop-types";
import styles from "./Appointment.module.css";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import Swal from "sweetalert2";

const Appointment = ({ id, date, time, status }) => {
	const { cancelAppointment } = useContext(UsersContext);

	const handleCancel = async () => {
		try {
			await cancelAppointment(id);
			Swal.fire({
				icon: "warning",
				color: "red",
				title: "Appointment cancelled succesfully",
			});
		} catch {
			Swal.fire({
				icon: "warning",
				title: "The appointment could not be cancelled. Please try again...",
			});
		}
	};

	return (
		<div className={styles.card}>
			<div>
				<h3 className={styles.title}>Appointment #{id}</h3>
				<span className={styles.status}>Status: {status}</span>
				<p className={styles.date}>Date: {date}</p>
				<p className={styles.time}>Time: {time}</p>

				<button
					className={styles.cancel}
					onClick={handleCancel}
					disabled={status === "cancelled"}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

Appointment.propTypes = {
	id: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
};

export default Appointment;
