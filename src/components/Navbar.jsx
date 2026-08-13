import { Link, useNavigate } from "react-router-dom";
import BecomeAuthor from "./BecomeAuthor";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar(){
  const {isLoggedIn, setIsLoggedIn, isAuthor} = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogOut(){
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/');
  }

  function handleRedirectToAuthorDashboard(){
    window,location.href = "http://localhost:5173/login";
  }

    return (
      <nav className="navbar">
        <a className="logo" href="/">The Journal</a> 
        <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <button>Search</button>
            {!isLoggedIn && (
              <>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Register</Link>
              </>
            )}

            {(isLoggedIn && !isAuthor) && (
              <>
              <BecomeAuthor/>
              <button onClick={handleLogOut}>LogOut</button>
              </>
            )}
            {(isLoggedIn && isAuthor) && (
              <>
              <button onClick={handleRedirectToAuthorDashboard}>Author Dashboard</button>
              </>
            )}

        </div>
      </nav>  
    );
}

export default Navbar;