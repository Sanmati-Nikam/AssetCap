import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        loading: true
    });

    const verifyUser = useCallback(async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:8000/user-verification",
                {},
                { withCredentials: true }
            );

            setAuthState({
                isAuthenticated: data.status,
                user: data.user,
                loading: false
            });
        } catch (error) {
            setAuthState({
                isAuthenticated: false,
                user: null,
                loading: false
            });
        }
    }, []);

    // In AuthContext.js
    const login = useCallback(async (credentials) => {
        try {
            console.log("creds: ", credentials.email, credentials.password)
            const { data } = await axios.post(
                "http://localhost:8000/login",
                credentials,
                { withCredentials: true }
            );

            console.log(data.success)

            // Verify user immediately after successful login
            await verifyUser();

            // Return server response
            return {
                success: data.success,
                message: data.message
            };

        } catch (error) {
            // Return error message from server or generic error
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    }, [verifyUser]);

    const logout = useCallback(async () => {
        try {
            await axios.post(
                "http://localhost:8000/signout",
                {},
                { withCredentials: true }
            );
            // Reset auth state
            setAuthState({
                isAuthenticated: false,
                user: null,
                loading: false
            });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, []);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    return (
        <AuthContext.Provider value={{ authState, login, logout, verifyUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};