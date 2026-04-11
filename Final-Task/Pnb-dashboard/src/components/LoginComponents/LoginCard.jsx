import styles from "./LoginCard.module.css";
import logo from "../../assets/images/logo.png";
import {useAuth} from "../../auth/useAuth";

export default function LoginCard() {
  const {login}= useAuth();
  return (
        <div className={styles.loginCard}>
          
          {/* Logo */}
          <div className={styles.logoContainer}>
            <img src={logo} alt="PNB Logo" className={styles.logo} />
          </div>

          {/* Title */}
          <h2 className={styles.cardTitle}>Login to your Account</h2>
            {/* Button */}
            <button onClick={login} className={styles.loginButton}>
              Login
            </button>
        </div>
  );
}