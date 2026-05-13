import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {FaUserSecret} from "react-icons/fa";
import './auth.css'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const api =  import.meta.env.VITE_API_URL;

    const loginUser = async (userEmail, userPassword) => {
        try{
            const res = await axios.post(`${api}/auth/login`, {email: userEmail , password: userPassword})
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isAdmin", res.data.user.isAdmin);
            localStorage.setItem("user", res.data.user.username);
            navigate("/home")           
        }catch(err){
            console.log(err);
            alert(err.response.data.message);
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        loginUser(email, password);

    };

    const handleGuestLogin = () => {

        loginUser(
            "demo@gmail.com",
            "demo123"
        );

    };

    return(
    <div className="container-fluid">
        <div className="auth-page">
                <div className="col-12 col-md-8 col-lg-4">
                    <div className="card auth-card shadow-lg">
                        <div className="col-10 p-4">
                            <h1>Login</h1>
                            <form className="mt-4" onSubmit={handleSubmit}>
                                <input className="mt-4 pb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                                <input className="mt-4 pb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                                 <p className="mt-4">Don't have an account? <Link to="/register">Register</Link></p>
                                <button className="mt-2 mb-2" type="submit">Login</button>
                            </form>   
                            <Link onClick={handleGuestLogin}>
                                <FaUserSecret /> Try Demo Account
                            </Link>                           
                        </div>
                    </div>
                </div>
        </div>
    </div>
    )
}

export default Login;