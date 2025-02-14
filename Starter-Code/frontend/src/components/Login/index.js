import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5000/user/login"
      : "http://localhost:5000/user/register";
    const data = isLogin
      ? { email, password }
      : {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          email,
          password,
        };

    axios
      .post(url, data)
      .then((result) => {
        setStatus(true);
        setMessage(result.data.message);
      })
      .catch((error) => {
        setStatus(false);
        setMessage(error.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <MDBContainer
      fluid
      className="p-4"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/7048061/pexels-photo-7048061.jpeg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "93.5vh",
      }}
    >
      <MDBRow className="h-100">
        <MDBCol
          md="7"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            <br />
            <span className="text-primary">
              {/* {isLogin ? "Login to your account" : "Create an account"} */}
            </span>
          </h1>
        </MDBCol>

        {/* العمود الأيمن */}
        <MDBCol
          md="4"
          className="offset-md-1 d-flex align-items-center justify-content-center"
        >
          <MDBCard
            className="my-5 blurred-container"
            style={{ width: "100%", maxWidth: "600px", display: "flex" }}
          >
            <h1
              style={{ alignSelf: "center", color: "#14A44D" }}
              className="text-success"
            >
              <br />
              <span>
                {isLogin ? "Login to your account" : "Create an account"}
              </span>
            </h1>
            <MDBCardBody className="p-5">
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="First name"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Last name"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                )}
                {!isLogin && (
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Phone Number"
                    type="text"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBBtn
                  className="w-100 mb-4"
                  size="sm"
                  type="submit"
                  color="success"
                  style={{fontSize:"20px"}}
                >
                  {isLogin ? "Sign in" : "Sign up"}
                </MDBBtn>
              </form>
              {message && (
                <div className={status ? "text-success" : "text-danger"}>
                  {message}
                </div>
              )}
              <div className="text-center">
                <p> {isLogin ? "or sign in with" : "or sign up with"}</p>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="1x" className="text-success"/>
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="1x" className="text-success"/>
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="1x" className="text-success" />
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="1x" className="text-success" />
                </MDBBtn>
              </div>
              <p className="text-center mt-3">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <span
                className="text-success"
                  style={{
                    cursor: "pointer",
                    fontWeight:"bold",
                    textDecoration: "underline",
                  }}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  
                  {isLogin ? "Register" : "Login"}
                </span>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Auth;
