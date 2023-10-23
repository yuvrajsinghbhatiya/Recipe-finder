import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link">
          Yummify
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/favorites" className="nav-link nav-button">
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
