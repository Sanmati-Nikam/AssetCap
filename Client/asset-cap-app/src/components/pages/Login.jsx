import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

// asset imports
import orArrow from "../../assets/orArrow.png";
import lockIcon from "../../assets/lock.png";

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { email, password } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-left",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(inputValue)
            const { success, message } = await login(inputValue);
            console.log("succ: ", success)
            if (success) {
                handleSuccess(message);
                navigate("/home");
            } else {
                handleError(message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            handleError("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
            setInputValue({
                email: "",
                password: "",
            });
        }
    };

    return (
        <div className="container">
            <div className="headingContainer">
                <p className="heading">Login</p>
                <p className="googleText">Use Google for</p>
                <p className="googleText">quick access</p>
            </div>
            <div className="middleBox">
                <p className="middleText">Or else</p>
                <img
                    className="arrow"
                    src={orArrow}
                    alt="fill up your credentials"
                />
            </div>
            <div className="form_container">
                <img
                    className="lock"
                    src={lockIcon}
                    alt="protected"
                />
                <p>Secure Sign in</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={handleOnChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Submit"}
                    </button>
                    <span>
                        Don't have an account? <Link to={"/signup"}>Signup</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;