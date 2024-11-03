import styles from './ErrorPage.module.css';
import notFoundImg from '../../assets/notFoundImg.png';
import { Link } from "react-router-dom";

function ErrorPage() {
	return (
		<div className={styles.notFoundContainer}>
			<h1 className={styles.titleError}>Error 404</h1>
			<p className={styles.textRedirect}>
				Page could not be found.
			</p>
			<img src={notFoundImg} alt="404 not found" className={styles.notFoundImage} />
			<Link to="/" className={styles.homeButton}>Go Home</Link>
		</div>
	);
}

export default ErrorPage;
