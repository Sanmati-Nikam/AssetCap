import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const verifyCookie = async () => {
            try {
                const { data } = await axios.post("http://localhost:8000/user-verification",
                    {},
                    { withCredentials: true });

                if (data.status) {
                    setUsername(data.user);
                    toast(`Hello ${data.user}`);
                } else {
                    removeCookie("token");
                    navigate("/login");
                }
            } catch (error) {
                console.error("6. Error:", error);
            } finally {
                setLoading(false);
            }
        };
        verifyCookie();
    }, []);


    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className="home_page">
                <h4>Welcome <span>{username}</span></h4>
                <button onClick={() => { removeCookie("token"); navigate("/login"); }}>
                    LOGOUT
                </button>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;