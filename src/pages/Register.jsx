import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
  

function Register() {
    const navigate = useNavigate();
    
    async function handleSubmit(e){
    e.preventDefault();

    if(password !== confirmPassword){
      console.log("password do not match");
      return ;
    }

    const response = await fetch('http://localhost:8000/auth/sign-up',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        confirmPassword,
      }),
    });
    
    const data = await response.json();
    if(!response.ok){
      console.log(data.message);
      return ;
    }
    console.log("account created" + data);
    navigate('/login');


}
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1>The Journal</h1>
        <p className="auth-subtitle">Create Your Account</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            autoComplete="email"
          />

          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            autoComplete="new-password"
          />

          <label htmlFor="confirmPassword">ConfirmPassword</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />

          <button type="submit">Register</button>
        </form>
        <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;