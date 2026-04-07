import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./LoginCard.module.css";
import Footer from "./Footer";
import logo from "../assets/images/logo.png";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login clicked");
  };

  return (
      <div className={styles.pageContainer}>
        <div className={styles.loginCard}>
          
          {/* Logo */}
          <div className={styles.logoContainer}>
            <img src={logo} alt="PNB Logo" className={styles.logo} />
          </div>

          {/* Title */}
          <h2 className={styles.cardTitle}>Login to your Account</h2>

          {/* Form */}
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            
            {/* Username */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Username</label>
              <input
                type="text"
                placeholder="Enter your Username"
                className={styles.input}
              />
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>

              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  className={styles.input}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePasswordBtn}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button type="submit" className={styles.loginButton}>
              Login
            </button>

            {/* Actions */}
            <div className={styles.actions}>
              <label className={styles.rememberMe}>
                <input type="checkbox" name="rememberMe" className={styles.rememberMeInput} />
                Remember Me
              </label>

              <a href="#" className={styles.forgotPassword}>
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
  );
}