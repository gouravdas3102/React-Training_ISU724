import logo from '../../assets/images/backgroundlogo.png'
import styles from './Background.module.css'

export default function BackgroundTemplate(){
    return(
        <div className={styles.backgroundContainer}>
            <div 
                className={styles.backgroundImage}
                style={{ backgroundImage: `url(${logo})` }}
            />
            <div className={styles.blurShape}/>
        </div>
    )
}