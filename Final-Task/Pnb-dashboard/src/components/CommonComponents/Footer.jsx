import styles from './Footer.module.css'

export default function Footer(){
    return (
      <div className={styles.footerContainer}>
        <div className={styles.footer}>
        <button className={styles.footerLink}>Terms and Conditions</button>
        <button className={styles.footerLink}>Privacy Policy</button>
        <button className={styles.footerLink}>CA Privacy Notice</button>
      </div>
      </div>
    )
}