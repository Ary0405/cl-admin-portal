import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Styles/SignUp.css'

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    React.useEffect(() => {
        const clearLogin = () => {
            localStorage.removeItem('signin')
            localStorage.removeItem('admin')    
        }
        clearLogin();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (email === 'admin-crooked-lines@gmail.com') {
            if (password === 'admin123') {
                console.log("login successful admin")
                localStorage.setItem('signin', 'true')
                localStorage.setItem('admin', 'true')
                navigate('/admin')
            }
        } else if (email === 'jury-crooked-lines@gmail.com') {
            if (password === 'jury123') {
                console.log("login successful jury")
                localStorage.setItem('signin', 'true')
                localStorage.setItem('admin', 'false')
                navigate('/jury')
            }
        } else {
            setError("Invalid Credentials");
            alert("Invalid Credentials")
        }
    };
    return (
        <form onSubmit={handleSubmit} className="signin_form">
            <h3>Admin / Jury Portal</h3>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">SignIn</button>
        </form>
    )
}

export default SignUp