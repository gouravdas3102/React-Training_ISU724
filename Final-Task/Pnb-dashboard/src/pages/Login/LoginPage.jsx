import styles from './LoginPage.module.css'
import LoginCard from '../../components/LoginComponents/LoginCard';
import Footer from '../../components/CommonComponents/Footer';
import BackgroundTemplate from '../../components/CommonComponents/Background';


export default function LoginPage() {
    return (
        <div className={styles.loginPage}>        
            
            <BackgroundTemplate />               
            
            <div className={styles.mainContent}>
                <LoginCard />
            </div>

            <Footer />
        </div>
    )
}