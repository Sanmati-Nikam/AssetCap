import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import styles from "./Home.css"

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
            <div className="userMessage">
                <h4>Welcome <span>{authState.user}</span></h4>
                {/* Use context logout function */}
                <button onClick={async () => {
                    await logout();
                    navigate("/login");
                }}>
                    LOGOUT
                </button>
            </div>   
                <div className="headerPanel">
                    <div className="headerTitle invested">
                        <div>Invested</div>
                        <div className="headerValue1"></div>
                    </div>
                    <div className="headerTitle current">
                        <div>Current</div>
                        <div className="headerValue2"></div>
                    </div>
                    <div className="divider"></div>
                    <div className="headerTitle pnl">
                        <div>P&L</div>
                        <div className="headerValue3"></div>
                    </div>
                </div>
                <div className="container">
                <div className="item1">
                    <div className="itemTitle">
                        Stocks
                    </div>
                        <button className="itemBtn">
                        + Add more stocks
                    </button>
                </div>
                    <div className="item2">
                        <div className="itemTitle">
                            Mutual Fund
                        </div>
                        <button className="itemBtn">
                            + Add more MFs
                        </button>
                    </div>
                    <div className="item3">
                        <div className="itemTitle">
                            Cryptocurrency
                        </div>
                        <button className="itemBtn">
                            + Add more crypto
                        </button>
                    </div>
                    <div className="item4">
                        <div className="itemTitle">
                            Gold
                        </div>
                        <button className="itemBtn">
                            + Add more gold peices
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};
export default Home;