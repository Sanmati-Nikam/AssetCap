import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
    const { authState, logout } = useAuth();
    const navigate = useNavigate();

    // Remove unnecessary cookie operations and state
    useEffect(() => {
        if (authState.isAuthenticated) {
            toast(`Hello ${authState.user}`);
        }
    }, [authState.isAuthenticated, authState.user]);

    if (authState.loading) return <div>Loading...</div>;

    return (
        <>
            <div className="home_page">
                <h4>Welcome <span>{authState.user}</span></h4>
                {/* Use context logout function */}
                <button onClick={async () => {
                    await logout();
                    navigate("/login");
                }}>
                    LOGOUT
                </button>
            </div>
            <ToastContainer />
        </>
    );
};
export default Home;