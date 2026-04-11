import {styles} from "./Sider.module.css";
import {logo} from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

export default function Sider() {
    return (
        <div className={styles.sider}>
            <div className={styles.siderLogoContainer}>
                <img src={logo} alt="PNB Logo" className={styles.siderLogo}/>
                <div className={styles.siderTitle}/>
                <nav>
                    <Link to="/dashboard" className={styles.siderLink}>
                        <
                    </Link>
                </nav>
            </div>
        </div>
    )
}