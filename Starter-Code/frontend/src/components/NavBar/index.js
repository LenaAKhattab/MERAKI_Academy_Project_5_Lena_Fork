import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
//this nav is by bootstrap

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container d-flex flex-column">
        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav text-center border-bottom pb-1">
            <li className="nav-item px-3">
              <a
                className="nav-link"
                href="#"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link" href="#">
                Categories
              </a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link" href="#">
                Our Story
              </a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link" href="#">
                Contact Us
              </a>
            </li>
            <li className="nav-item px-3">
              <a
                className="nav-link"
                href="#"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </a>
            </li>
          </ul>
        </div>
        {/* Underline */}
        {/* <hr className="w-100 mt-0 mb-0" /> */}
      </div>
    </nav>
  );
};

export default Navbar;
