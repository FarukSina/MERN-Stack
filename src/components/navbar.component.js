import React from "react";
import { Link } from "react-router-dom";
import RegisterModal from "./auth.js/RegisterModal";
import Logout from "./auth.js/Logout";
const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbark-expand-lg">
      <Link to="/" className="navbar-brand">
        Exercises Controller
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Exercises
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              Create Exercises
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/user" className="nav-link">
              Create User
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/adminUsers" className="nav-link">
              Create Admin User
            </Link>
          </li>
          <RegisterModal />
          <Logout />
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
