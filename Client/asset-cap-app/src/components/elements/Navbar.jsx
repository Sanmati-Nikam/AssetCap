import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Adjust path as needed
import styles from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { authState, logout } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set loading to false once authState is initialized
        if (!authState.loading) {
            setLoading(false);
        }
    }, [authState.loading]);

    const handleLoginClick = () => navigate("/login");
    const handleSignupClick = () => navigate("/signup");

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (loading) {
        return (
            <nav className={styles.navbar}>
                <div>Loading...</div>
            </nav>
        );
    }

    return (
        <nav className={styles.navbar}>
            {/* Logo Section */}
            <div className={styles.logoContainer}>
                <img
                    src="/logo.png"
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
            {authState.isAuthenticated ? (
                <div className={styles.authButtons}>
                    <span className={styles.username}>{authState.username}</span>
                    <button
                        className={styles.logoutButton}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className={styles.authButtons}>
                    <button
                        className={styles.loginButton}
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                    <button
                        className={styles.registerButton}
                        onClick={handleSignupClick}
                    >
                        Register Now
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;