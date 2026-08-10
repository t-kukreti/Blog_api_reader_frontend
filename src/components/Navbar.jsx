function Navbar(){
    return (
      <nav className="navbar">
        <a className="logo" href="/">The Journal</a> 
        <div className="nav-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <button>Search</button>
        </div>
      </nav>  
    );
}

export default Navbar;