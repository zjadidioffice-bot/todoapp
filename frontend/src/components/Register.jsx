import { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[message,setMessage]=useState("");
    const handleRegister = (event) => {
        event.preventDefault();

        fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
                console.log(data);

                if(data.message==="user registered successfully"){
                    setName("");
                    setEmail("");
                    setPassword("");
                }
            })
            .catch(()=>{
                setMessage("server error");
            });
    };

    return (
        <div className="auth-box">
            <h2>register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            <button type="submit">register</button>                    
            </form>
            {message&&<p>{message}</p>}
        </div>
    );
}

export default Register;