import { Link, useNavigate } from "react-router-dom";
import styles from './Navbar.module.css';
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import Swal from "sweetalert2"

function Navbar() {
    const { logOutUser, user } = useContext(UsersContext);
    const navigate = useNavigate()

    const handleLogOut = () => {
        logOutUser()
        Swal.fire({
            icon: "warning",
            title: "Logout sussesfully"
        })
        navigate("/login");
    }

    return (
        <nav className={styles.nav}>
            {!user ? (
                <ul className={styles.ul}>
                    <li className={styles.li}><Link className={`${styles.link} ${location.pathname === "/" ? styles.activeLink : ""}`} to="/">Home</Link></li>
                    <li className={styles.li}><Link className={`${styles.link} ${location.pathname === "/login" ? styles.activeLink : ""}`} to="/login">Login</Link></li>
                    <li className={styles.li}><Link className={`${styles.link} ${location.pathname === "/register" ? styles.activeLink : ""}`} to="/register">Register</Link></li>
                </ul>
            ) : (
                <ul className={styles.ul}>
                    <li className={styles.li}><Link className={`${styles.link} ${location.pathname === "/" ? styles.activeLink : ""}`} to="/">Home</Link></li>
                    <li className={styles.li}><Link className={`${styles.link} ${location.pathname === "/appointments" ? styles.activeLink : ""}`} to="/appointments">My Appointments</Link></li>
                    <li className={styles.li}><Link className={`${styles.link} ${location.pathname === "/newappointment" ? styles.activeLink : ""}`} to="/newappointment">Schedule Appointment</Link></li>
                    <li className={styles.li}><Link className={styles.link} onClick={handleLogOut}>Logout</Link></li>
                </ul>
            )}
            
        </nav>
    );
}

export default Navbar;
