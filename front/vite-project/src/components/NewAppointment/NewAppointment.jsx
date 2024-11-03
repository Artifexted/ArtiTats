import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import { dateFormValidates } from "../../helpers/dateFormValidates";
import styles from "./NewAppointment.module.css";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
	const initialValues = {
		date: "",
		time: "",
	};

	const minDate = moment().add(1, "day").format("YYYY-MM-DD");

	const { createAppointment } = useContext(UsersContext);

	const navigate = useNavigate();

	const handleOnSubmit = async (values) => {
		try {
			await createAppointment(values);
			Swal.fire({
				icon: "success",
				title: "You have successfully scheduled an appointment!",
				timer: 3000,
			});

			navigate("/appointments");
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: `Error scheduling the appointment:`,
				text: `${error.response.data.details}`,
				timer: 3000,
			});
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validate={dateFormValidates}
			onSubmit={handleOnSubmit}
		>
			{({ errors }) => (
				<Form className={styles.form}>
					<label className={styles.label} htmlFor="date">
						Date
					</label>
					<Field
						type="date"
						id="date"
						name="date"
						min={minDate}
						className={styles.input}
					/>
					<ErrorMessage name="date" component="div" className={styles.error} />

					<label className={styles.label} htmlFor="time">
						Time
					</label>
					<Field type="time" id="time" name="time" className={styles.input} />
					<ErrorMessage name="time" component="div" className={styles.error} />

					<button
						type="submit"
						disabled={Object.keys(errors).length > 0}
						className={styles.button}
					>
						Schedule Appointment
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default AppointmentForm;
