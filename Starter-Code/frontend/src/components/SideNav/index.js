import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./style.css";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {/* زر فتح القائمة */}
      <MDBBtn color="primary" onClick={() => setOpen(!open)} className="m-3">ssss
      </MDBBtn>

      {/* القائمة الجانبية */}
      <MDBNavbar dark bgColor="dark" className="sidebar">
        <MDBCollapse open={open} navbar>
          <MDBNavbarNav className="flex-column">
            <MDBNavbarItem
              className="p-3"
              onClick={() => navigate("/dashboard")}
            >
              <MDBIcon fas icon="tachometer-alt" className="me-2" />
              Dashboard
            </MDBNavbarItem>

            <MDBNavbarItem className="p-3" onClick={() => navigate("/profile")}>
              <MDBIcon fas icon="user" className="me-2" />
              Profile
            </MDBNavbarItem>

            <MDBNavbarItem
              className="p-3"
              onClick={() => navigate("/settings")}
            >
              <MDBIcon fas icon="cogs" className="me-2" />
              Settings
            </MDBNavbarItem>

            <MDBNavbarItem
              className="p-3 text-danger"
              onClick={() => alert("Logging out...")}
            >
              <MDBIcon fas icon="sign-out-alt" className="me-2" />
              Logout
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
  );
};

export default Sidebar;
