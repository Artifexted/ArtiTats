import banner from '../../assets/artitats-banner.jpg';
import styles from './Banner.module.css';

function Banner() {
    return (
        <div className={styles.banner}>
            <img src={banner} alt="Banner" className={styles.bannerImage} />
        </div>
    );
}

export default Banner;
