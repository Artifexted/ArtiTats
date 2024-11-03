import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateRegister } from "../../helpers/validateRegister";
import styles from "../../styles/Forms.module.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";
import { useContext } from "react";

function Register() {
	const { registerUser } = useContext(UsersContext);

	const handleOnSubmit = async (values) => {
		const payload = {
			name: values.name,
			email: values.email,
			birthdate: values.birthdate,
			nDni: values.nDni,
			credentials: {
				username: values.username,
				password: values.password,
			},
		};

		try {
			await registerUser(payload);
			Swal.fire({
				icon: "success",
				title: "You have registered successfully!",
				timer: 3000,
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: `Register failed:`,
				text: `${error.response.data.details}`,
				timer: 3000,
			});
		}
	};

	return (
		<Formik
			initialValues={{
				name: "",
				email: "",
				birthdate: "",
				nDni: "",
				username: "",
				password: "",
			}}
			validate={validateRegister}
			onSubmit={handleOnSubmit}
		>
			{({ isValid, isSubmitting }) => (
				<Form className={styles.formContainer}>
					<h2 className={styles.formTitle}>Register</h2>
					<div>
						<label className={styles.formLabel}>Name</label>
						<Field
							className={styles.formInput}
							type="text"
							name="name"
							placeholder="Cosme Fulanito"
						/>
						<ErrorMessage
							name="name"
							component="p"
							className={styles.errorMessage}
						/>
					</div>
					<div>
						<label className={styles.formLabel}>Email</label>
						<Field
							className={styles.formInput}
							type="email"
							name="email"
							placeholder="cosmefulanito@mail.com"
						/>
						<ErrorMessage
							name="email"
							component="p"
							className={styles.errorMessage}
						/>
					</div>
					<div>
						<label className={styles.formLabel}>Birthdate</label>
						<Field className={styles.formInput} type="date" name="birthdate" />
						<ErrorMessage
							name="birthdate"
							component="p"
							className={styles.errorMessage}
						/>
					</div>
					<div>
						<label className={styles.formLabel}>DNI</label>
						<Field
							className={styles.formInput}
							type="number"
							name="nDni"
							placeholder="12345678"
						/>
						<ErrorMessage
							name="nDni"
							component="p"
							className={styles.errorMessage}
						/>
					</div>
					<div>
						<label className={styles.formLabel}>Username</label>
						<Field
							className={styles.formInput}
							type="text"
							name="username"
							placeholder="cosme007"
						/>
						<ErrorMessage
							name="username"
							component="p"
							className={styles.errorMessage}
						/>
					</div>
					<div>
						<label className={styles.formLabel}>Password</label>
						<Field
							className={styles.formInput}
							type="password"
							name="password"
							placeholder="*****"
						/>
						<ErrorMessage
							name="password"
							component="p"
							className={styles.errorMessage}
						/>
					</div>
					<button
						className={styles.formButton}
						type="submit"
						disabled={!isValid || isSubmitting}
					>
						REGISTER
					</button>

					<p className={styles.changeFormText}>
						Already have an account? <Link to="/login">Login here</Link>
					</p>
				</Form>
			)}
		</Formik>
	);
}

export default Register;
