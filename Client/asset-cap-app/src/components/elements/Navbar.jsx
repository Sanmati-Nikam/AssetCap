import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            {/* Logo Section */}
            <div className={styles.logoContainer}>
                <img
                    src="/logo.png"  // Use this exact format since /logo.png works in browser
                    alt="AssetCap Logo"
                    className={styles.logoImage}
                />
                <p className={styles.logoText}>AssetCap</p>
            </div>

            {/* Navigation Links */}
            <div className={styles.navLinks}>
                <a href="#" className={styles.navLink}>Features</a>
                <a href="#" className={styles.navLink}>Benefits</a>
                <a href="#" className={styles.navLink}>How to use it</a>
                <a href="#" className={styles.navLink}>Contact us</a>
            </div>

            {/* Auth Buttons */}
            <div className={styles.authButtons}>
                <button className={styles.loginButton}>Login</button>
                <button className={styles.registerButton}>Register Now</button>
            </div>
        </nav>
    );
};

export default Navbar;