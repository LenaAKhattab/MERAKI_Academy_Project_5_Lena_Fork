import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/reducers/auth";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const roleId = useSelector((reducer) => reducer.authReducer.roleId);
  const isLoggedIn = useSelector((reducer) => reducer.authReducer.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <div style={{ border: "1px solid red", color: "black" }}>
      {roleId !== 1 && (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm fffnav" style={{ height: "120px" }}>
          <div className="container d-flex align-items-center">
            <img
              src={Logo}
              alt="Logo"
              style={{ height: "100px", marginRight: "20px" }}
            />
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav" style={{ fontSize: "35px", color: "red" }}>
              <ul className="navbar-nav text-center pb-1">
                <li className="nav-item px-3" style={{ color: "black" }}>
                  <Link style={{ color: "black" }} className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link style={{ color: "black" }} className="nav-link">
                    About Us
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link style={{ color: "black" }} className="nav-link" to="/categoriesPage">
                    Categories
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link to="/getOrder" style={{ color: "black" }} className="nav-link">
                    My Orders
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link className="nav-link" to="" style={{ color: "black" }}>
                    Contact Us
                  </Link>
                </li>
                {isLoggedIn ? (
                  <li className="nav-item px-3">
                    <a style={{ color: "black" }} className="nav-link" href="#" onClick={() => dispatch(setLogout())}>
                      Logout
                    </a>
                  </li>
                ) : (
                  <li className="nav-item px-3">
                    <Link style={{ color: "black" }} className="nav-link" to="/login" onClick={() => navigate("/login")}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
