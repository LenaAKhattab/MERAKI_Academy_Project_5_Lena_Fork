import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setLogin, setUserId } from "../../redux/reducers/auth/index";
import axios from "axios";

// ==============================================
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  const authIsLoggedIn = useSelector(
    (reducers) => reducers.authReducer.isLoggedIn
  );

  const dispatch = useDispatch();
  // ================================
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", { email, password })
      .then((result) => {
        console.log(result);
        setMessage(result.data.message);
        dispatch(setLogin({ token: result.data.token, roleId: result.data.roleId })); 
        dispatch(setUserId(result.data.userId));
        setStatus(true);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        setStatus(false);
      });
  };
  //=========================================

  //   TODO

  // Should update navigation path later
  useEffect(() => {
    if (authIsLoggedIn) {
      navigate("/category");
    }
  });

  return (
    <div className="Form">
      <form onSubmit={login}>
        <br />
        <p className="Title">Login Form</p>
        <br />
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button>Login</button>
        <br />
      </form>
      {/* {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>} */}
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </div>
  );
};

export default Login;
