import { useState } from "react";
import styles from "./ThemeButton.module.css"

function ThemeButton(){
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };
    return (
        <button onClick={toggleTheme} className={`${styles.base} ${isDarkMode ? styles.dark : styles.light}`}>
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>   
    )
}

export default ThemeButton;