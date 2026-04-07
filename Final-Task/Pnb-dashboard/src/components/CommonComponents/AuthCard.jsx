import PropTypes from "prop-types"
import styles from "./AuthCard.module.css"
import logo from "../../assets/images/logo.png"

export default function AuthCard({title,subtitle,children,cardfooter}) {
    return (
        <div >
            <div className={styles.logoContainer}>
                <img src={logo} alt="PNB Logo" className={styles.logo} />
            </div>
            <h2 className={styles.cardTitle}>{title} </h2>
            {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
            {div className}
        </div>
    )
}

AuthCard.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    children: PropTypes.node,
    cardfooter: PropTypes.node,
}