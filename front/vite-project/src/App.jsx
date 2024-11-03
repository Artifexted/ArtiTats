import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./views/Login/Login";
import Appointments from "./views/Appointments/Appointments";
import Register from "./views/Register/Register";
import Header from "./components/Header/Header";
import Home from "./views/Home/Home";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import Banner from "./components/Banner/Banner";
import styles from "./App.module.css";
import Footer from "./components/Footer/Footer";
import { useEffect, useContext } from "react";
import { UsersContext } from "./context/UsersContext";
import NewAppointment from "./components/NewAppointment/NewAppointment";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useContext(UsersContext);

	useEffect(() => {
		if (
			!user &&
			location.pathname !== "/login" &&
			location.pathname !== "/register" &&
			location.pathname !== "/"
		) {
			navigate("/login");
		}

		if (
			(user && location.pathname === "/login") ||
			(user && location.pathname === "/register")
		) {
			navigate("/");
		}
	}, [location.pathname, user, navigate]),
		[location.pathname, user];

	return (
		<>
			{!user ? (
				<div className={styles.allContent}>
					<Header />
					<Banner />
					<main className={styles.mainContent}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</main>
					<Footer />
				</div>
			) : (
				<div className={styles.allContent}>
					<Header />
					<Banner />
					<main className={styles.mainContent}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/appointments" element={<Appointments />} />
							<Route path="/newappointment" element={<NewAppointment />} />
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</main>
					<Footer />
				</div>
			)}
		</>
	);
}

export default App;
