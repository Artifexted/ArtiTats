import styles from "./Appointments.module.css";

function AppointmentsNotFound() {
	return (
		<h2 className={styles.emptyMessage}>
			There are no appointments to display
		</h2>
	);
}

export default AppointmentsNotFound;
