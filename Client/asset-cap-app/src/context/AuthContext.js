import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        username: '',
        loading: true,
        error: null
    });

    const verifyUser = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:8000/user-verification",
                {},
                { withCredentials: true }
            );

            setAuthState({
                isAuthenticated: data.status,
                username: data.user || '',
                loading: false,
                error: null
            });
            return data.status;
        } catch (error) {
            setAuthState({
                isAuthenticated: false,
                username: '',
                loading: false,
                error: error.message
            });
            return false;
        }
    };

    const login = async (credentials) => {
        try {
            setAuthState(prev => ({ ...prev, loading: true }));
            const { data } = await axios.post(
                "http://localhost:8000/login",
                credentials,
                { withCredentials: true }
            );

            if (data.status) {
                await verifyUser();
                return { success: true };
            }
            return { success: false, error: data.message };
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || error.message
            }));
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                "http://localhost:8000/signout",
                {},
                { withCredentials: true }
            );
            setAuthState({
                isAuthenticated: false,
                username: '',
                loading: false,
                error: null
            });
            return { success: true };
        } catch (error) {
            console.error("Logout error:", error);
            return { success: false, error: error.message };
        }
    };

    useEffect(() => {
        verifyUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            authState,
            login,
            logout,
            verifyUser
        }}>
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