import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";


function Header() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: ''
    });
    localStorage.removeItem('auth')
  }
  return (
    <header>
      <nav>
        <NavLink to={auth?.token ? "/my-notes" : "/"}><h1>Keep Notes</h1></NavLink>
        <div>
          {!auth.user ? (
            <>
              <NavLink to='/register'>Register</NavLink>
              <NavLink to='/login'>Login</NavLink>
            </>
          ) : (
            <>
              <NavLink to='/'>{auth.user.name}</NavLink>
              <NavLink onClick={handleLogout} to='/login'>Logout</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
