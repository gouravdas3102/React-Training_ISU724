import styles from "./Card.module.css"

function Card(){
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Card Title</h2>
            <p>This is a simple card component.</p>
        </div>
    )
}

export default Card