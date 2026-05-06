import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './auth.css';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`${api}/auth/register`, {username, email, password})
            alert("Regsitered successfully!");
            navigate("/")
        }catch(err){
            alert(err.response.data.message)
        }
    }

    return(
        <div className="container-fluid">
        <div className="auth-page">
                <div className="col-12 col-md-8 col-lg-4">
                    <div className="card auth-card shadow-lg">
                        <div className="col-10 p-4">
                                    <h1>Register</h1>
                                    <form className="mt-4" onSubmit={handleSubmit}>
                                        <input  className="mt-4 pb-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
                                        <input  className="mt-4 pb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                                        <input  className="mt-4 pb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                                        <p className="mt-4">Alredy have an account? <a href="/">Login</a></p>
                                        <button className="mt-4 mb-2" type="submit">Register</button>
                                    </form>
                                    
                           </div>
                    </div>
                </div>
        </div>
    </div>
    )
}

export default Register;