import Navbar from '../Navbar/Navbar';
import logo from '../../assets/artitats.png';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <Navbar />
        </header>
    );
}

export default Header;
