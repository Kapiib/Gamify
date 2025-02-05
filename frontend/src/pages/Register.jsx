import "../css/components/Form.css"
import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [msg, setMsg] = useState("");
    
    function handleSubmit(e) {
        e.preventDefault()
        console.log("Register")
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, 
        {email, password, repeatPassword}, {withCredentials: true})
        .then((response) => {
            setMsg(response.data.msg);
            setTimeout(() => {
                if(response.status == 201) window.location.replace("/login")
            }, 500)
        })
    }
    return (
        <div className="register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type="password" placeholder="repeat password" onChange={(e) => setRepeatPassword(e.target.value)}></input>
                <button type="submit">Register</button>
            </form>
            {msg?<div><p>{msg}</p></div>:<div></div>}
        </div>
    )
}