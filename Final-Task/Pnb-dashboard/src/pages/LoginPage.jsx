import styles from './LoginPage.module.css'
import LoginCard from '../components/LoginCard';
import Footer from '../components/Footer';

export default function LoginPage() {
    return (
        <div className={styles.loginPage}>
  
            <div className={styles.mainContent}>
                <LoginCard />
            </div>

            <Footer />

        </div>
    )
}