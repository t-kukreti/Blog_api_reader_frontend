import { Link, useNavigate } from "react-router-dom";
import BecomeAuthor from "./BecomeAuthor";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, isAuthor, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/');
  }

  function handleRedirectToAuthorDashboard() {
    window.location.href = "http://localhost:5174/login";
  }

  if(authLoading){
    return null;
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

            {isLoggedIn && !isAuthor && (
              <>
                <BecomeAuthor />
              </>
            )}

            {isLoggedIn && isAuthor && (
              <button onClick={handleRedirectToAuthorDashboard}>
                Author Dashboard
              </button>
            )}

            {isLoggedIn && (<button onClick={handleLogOut}>Logout</button>)}


      </div>
    </nav>
  );
}

export default Navbar;