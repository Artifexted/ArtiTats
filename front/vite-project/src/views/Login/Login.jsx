import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLogin } from "../../helpers/validateLogin";
import styles from "../../styles/Forms.module.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";
import { useContext } from "react";

function Login() {
	const navigate = useNavigate();

	const { loginUser } = useContext(UsersContext);

	const handleOnSubmit = async (values) => {
		try {
			await loginUser(values)
			
			Swal.fire({
				icon: "success",
				title: "You have successfully logged in!",
				timer: 3000,
			});
			navigate("/");
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: `Login failed:`,
				text: `${error.response.data.details}`,
				timer: 3000,
			});
		}
	};

	return (
		<Formik
			initialValues={{ username: "", password: "" }}
			validate={validateLogin}
			onSubmit={handleOnSubmit}
		>
			{({ isValid, isSubmitting }) => (
				<Form className={styles.formContainer}>
					<h2 className={styles.formTitle}>Login</h2>
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
						SUBMIT
					</button>

					<p className={styles.changeFormText}>{`Don't have an account yet?`} <Link to="/register">Register here</Link></p>
				</Form>
			)}
		</Formik>
	);
}

export default Login;
