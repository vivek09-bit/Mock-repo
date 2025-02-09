import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  // Check if the user is logged in by checking localStorage for a token
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
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
                {/* <li className="nav-item" role="presentation"><a className="nav-link active" href="#">Home</a></li> */}
                <li className="dropdown">
                  <a className="dropdown-toggle nav-link"  data-toggle="dropdown" aria-expanded="false" href="#">Tests</a>
                  <div className="dropdown-menu" role="menu">
                    <a className="dropdown-item" href="#">Aptitute</a>
                    <a className="dropdown-item" href="#">IT</a>
                    <a className="dropdown-item" href="#">Gov. Job</a>
                  </div>
                </li>
              </ul>
              <form className="form-inline mr-auto" target="_self">
                <div className="form-group">
                  {/* <label htmlFor="search-field"><i className="fa fa-search"></i></label>
                  <input className="form-control search-field" type="search" name="search" id="search-field" placeholder="Search..." /> */}
                </div>
              </form>
              <span className="navbar-text">
                {token ? (
                  <>
                    <Link className="btn btn-dark action-button" to="/profile">Profile</Link>
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
        {/* <div className="container hero">
          <div className="row">
            <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
              <h1>The revolution is here.</h1>
              <p>Experience the next level of mock testing with our advanced platform designed for success.</p>
              <button className="btn btn-light btn-lg action-button" type="button">Learn More</button>
            </div>
            <div className="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block phone-holder">
              <div className="iphone-mockup">
                <img src="assets/img/iphone.svg" className="device" alt="Mockup" />
                <div className="screen"></div>
              </div>
            </div>
          </div>
        </div> */}
      
    </div>


    </>
  );
}

export default Header;