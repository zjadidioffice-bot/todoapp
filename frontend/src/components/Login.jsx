import { useState } from "react";

function Login({onLogin}){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const handleLogin=(event)=>{
        event.preventDefault();

        fetch("http://localhost:3000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email,
                password,
            }),
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);

            if(data.token){
                localStorage.setItem("token",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));

                alert("login successful");
                onLogin();
            }
        });
    };
    return(
        <div>
           <h2>login</h2> 
           <form onSubmit={handleLogin}>
            <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(event)=>setEmail(event.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            />
            <button type="submit">login</button>
           </form>
        </div>
    );
}

export default Login;