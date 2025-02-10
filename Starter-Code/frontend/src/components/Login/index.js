import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setUserId } from "../../redux/reducers/auth/index";
import axios from "axios";

const Login = () => {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (String(value) === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  const authIsLoggedIn = useSelector(
    (reducers) => reducers.authReducer.isLoggedIn
  );
  const authRoleId = useSelector(
    (reducers) => reducers.authReducer.roleId
  );
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", { email, password })
      .then((result) => {
        setMessage(result.data.message);
        dispatch(
          setLogin({ token: result.data.token, roleId: result.data.roleId })
        );
        dispatch(setUserId(result.data.userId));
        setStatus(true);
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Login failed");
        setStatus(false);
      });
  };

  useEffect(() => {

    if (authIsLoggedIn) {
      navigate("/categoriesPage");


    if (authIsLoggedIn&&authRoleId==="1") {
      navigate("/sideNav");
    }
    /*
     if (authIsLoggedIn&&authRoleId==="2") {
       navigate("/");
       change to user dash

    }
       */
  }}, []);

  return (
    <div className="full-page">
      <div className="blurred-container">
        <MDBContainer className="p-3 my-5 d-flex flex-column w-100">
          <MDBTabs
            pills
            justify
            className="mb-3 d-flex flex-row justify-content-between"
          >
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab1")}
                active={justifyActive === "tab1"}
                style={{ fontWeight:"bold", fontSize: "15px" }}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2"}
                style={{ fontWeight: "bold", fontSize: "15px" }}
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            {/* login */}
            <MDBTabsPane open={justifyActive === "tab1"}>
              <div className="text-center mb-3">
                <p style={{ fontSize: "20px" }}>Sign in with:</p>
                <div className="d-flex justify-content-between mx-auto social-icons">
                  <MDBBtn tag="a" color="none" className="m-1">
                    <MDBIcon fab color="white" icon="facebook-f" size="1x" />
                  </MDBBtn>
                  <MDBBtn tag="a" color="none" className="m-1">
                    <MDBIcon fab color="white" icon="twitter" size="1x" />
                  </MDBBtn>
                  <MDBBtn tag="a" color="none" className="m-1">
                    <MDBIcon fab color="white" icon="google" size="1x" />
                  </MDBBtn>
                  <MDBBtn tag="a" color="none" className="m-1">
                    <MDBIcon fab color="white" icon="github" size="1x" />
                  </MDBBtn>
                </div>
                <p className="text-center mt-3" style={{ fontSize: "20px" }}>or:</p>
              </div>
              <div className="LInput">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  style={{ color: "white" }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  style={{ color: "white" }}
                />
              </div>
              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  label={
                    <span className="text-center" style={{ fontSize: "20px" }}>
                      Remember me
                    </span>
                  }
                />
                <a
                  href="#!"
                  className="text-center"
                  style={{ fontSize: "20px" }}
                >
                  Forgot password?
                </a>
              </div>

              <MDBBtn
                className="mb-4 w-100"
                onClick={login}
                style={{ fontWeight: "bold" ,fontSize:"15px"}}
              >
                Sign in
              </MDBBtn>
              <p className="text-center" style={{ fontSize: "20px" }}>
                Not a member? <a href="#!">Register</a>
              </p>
            </MDBTabsPane>

            {/* register */}
            <MDBTabsPane open={justifyActive === "tab2"}>
              <div className="text-center mb-3">
                <p style={{ fontSize: "20px" }}>Sign up with:</p>
                <div className="d-flex justify-content-between mx-auto social-icons">
                  <MDBBtn tag="a" color="none" className="m-1">
                    <MDBIcon fab color="white" icon="facebook-f" size="1x" />
                  </MDBBtn>
                  <MDBBtn tag="a" color="none" className="m-1">
                    <MDBIcon fab color="white" icon="twitter" size="1x" />
                  </MDBBtn>
                  <MDBBtn tag="a" color="none" className="m-1">
                    <MDBIcon fab color="white" icon="google" size="1x" />
                  </MDBBtn>
                  <MDBBtn tag="a" color="none" className="m-1">
                    <MDBIcon fab color="white" icon="github" size="1x" />
                  </MDBBtn>
                </div>
                <p className="text-center mt-3" style={{ fontSize: "20px" }}>or:</p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="First Name"
                  type="text"
                  style={{ color: "white" }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Last Name"
                  type="text"
                  style={{ color: "white" }}
                />
              </div>
              <MDBInput
                wrapperClass="mb-4"
                label="Phon Number"
                type="tel"
                style={{ color: "white" }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                type="email"
                style={{ color: "white" }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                type="password"
                style={{ color: "white" }}
              />
              <MDBBtn className="mb-4 w-100" style={{ fontWeight: "bold" ,fontSize:"15px"}}>
                Sign up
              </MDBBtn>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Login;
