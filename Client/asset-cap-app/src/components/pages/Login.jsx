import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
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
            const { data } = await axios.post(
                "http://localhost:8000/login",
                { ...inputValue },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
        });
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
                src="../../assets/orArrow.png"  
                alt="fill up your credentials"
                // className={styles.logoImage}
            />
        </div>
            <div className="form_container">
                <img
                    src="../../assets/lock.png"
                    alt="protected"
                // className={styles.logoImage}
                />
                <p>Secure Sing in</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleOnChange}
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
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <span>
                        Already have an account? <Link to={"/signup"}>Signup</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>

        </div>
    );
};

export default Login;