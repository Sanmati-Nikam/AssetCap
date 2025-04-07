import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Navbar.module.css'; // Make sure to import your styles
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        username: '',
        loading: true
    });

    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Make sure to include credentials for cookies
                const { data } = await axios.post(
                    "http://localhost:8000/user-verification",
                    {},
                    { withCredentials: true }
                );

                if (data.status) {
                    setAuthState({
                        isAuthenticated: true,
                        username: data.user,
                        loading: false
                    });
                } else {
                    setAuthState({
                        isAuthenticated: false,
                        username: '',
                        loading: false
                    });
                }
            } catch (error) {
                console.error("Verification error:", error);
                setAuthState({
                    isAuthenticated: false,
                    username: '',
                    loading: false
                });
            }
        };

        verifyUser();
    }, []);

    const handleLoginClick = (()=> {
        navigate("/login");
    })

    const handleSignupClick = (() => {
        navigate("/signup");
    })

    const handleLogout = async () => {
        console.log("yes")
        try {
            const { data } = await axios.post(
                "http://localhost:8000/signout",
                {},
                { withCredentials: true }
            );

            if (data.message === "User signed out successfully") {
                setAuthState({
                    isAuthenticated: false,
                    username: '',
                    loading: false
                });

                // Optional: Redirect to home page
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    if (authState.loading) {
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