import React, { useState } from "react";
import axios from "axios";
import {useSelector} from "react-redux"
const Register = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const authIsLoggedIn = useSelector(
    (reducers) => reducers.authReducer.isLoggedIn
  );
  // ========================================================

  

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => {
          setFirst_name(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => {
          setLast_name(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Phone Number"
        onChange={(e) => {
          setPhone_number(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
