import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.left}>
				<p>Made with love <FaHeart className={styles.heartIcon} /> by <span className={styles.highlight}>Artifexted</span>.</p>
			</div>
			<div className={styles.right}>
				<a
					href="https://github.com/artifexted"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.iconLink}
				>
					<FaGithub className={styles.icon} />
				</a>
				<a
					href="https://www.linkedin.com/in/artifexted/"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.iconLink}
				>
					<FaLinkedin className={styles.icon} />
				</a>
			</div>
		</footer>
	);
}

export default Footer;
