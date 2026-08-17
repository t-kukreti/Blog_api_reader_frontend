import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



function Login() {
  const {setIsLoggedIn, setIsAuthor, setCurrentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    async function handleSubmit(e){
    e.preventDefault();

    const response = await fetch("http://localhost:8000/auth/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const data = await response.json();
    if(!response.ok){
        console.log(data.message);
        return;
    }
    // store the jwt in localstorage
    localStorage.setItem("token", data.token);
    setIsLoggedIn(true);
    setIsAuthor(data.user.isAuthor);
    setCurrentUser(data.user);
    navigate('/');
    console.log("logged in", data);

}
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1>The Journal</h1>
        <p className="auth-subtitle">Sign in to your Account</p>

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

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button type="submit">Sign in</button>
        </form>
        <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;