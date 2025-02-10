import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  // Check if the user is logged in by checking localStorage for a token
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user')); // Parse the user object from localStorage
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    localStorage.removeItem('user'); // Remove user from localStorage
    navigate(`/login/`); // Redirect to login page
  };

  return (
    <>
      <div className="p-3 mb-2 bg-primary text-white">
        <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
          <div className="container">
            <a className="navbar-brand" href="/">TeamIgnite</a>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#">Tests</a>
                  <div className="dropdown-menu" role="menu">
                    <a className="dropdown-item" href="#">Aptitute</a>
                    <a className="dropdown-item" href="#">IT</a>
                    <a className="dropdown-item" href="#">Gov. Job</a>
                  </div>
                </li>
              </ul>
              <form className="form-inline mr-auto" target="_self"></form>
              <span className="navbar-text">
                {token ? (
                  <>
                    {user && user.username ? (
                      <Link className="btn btn-dark action-button" to={`/profile/${user.username}`}>Profile</Link>
                    ) : (
                      <p>Loading username...</p>
                    )}
                    <button className="btn btn-light action-button" onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link className="login" to="/login">Log In</Link>
                    <a className="btn btn-dark action-button" role="button" href="/register">Sign Up</a>
                  </>
                )}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
