import React, { useState } from "react";
import "./style.css";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBRipple,
  MDBBadge,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const Sidebar = () => {
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

  return (
    <>
      <MDBCollapse
        show={showShow}
        tag="nav"
        className="d-lg-block bg-white sidebar"
      >
        <div className="position-sticky">
          <MDBListGroup flush className="mx-3 mt-4">
            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded rounded"
              >
                <MDBIcon fas icon="tachometer-alt me-3" />
                Main Dashboard
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="lock me-3" />
                Password
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="chart-line me-3" />
                Analitics
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon far icon="chart-bar me-3" />
                Orders
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="list-alt me-3" />
                Categories
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="calendar me-3" />
                Calendar
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="users me-3" />
                Users
              </MDBListGroupItem>
            </MDBRipple>
            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="user-alt me-3" />
                Collectors
              </MDBListGroupItem>
            </MDBRipple>
            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="sign-out-alt me-3" />
                Logout
              </MDBListGroupItem>
            </MDBRipple>
          </MDBListGroup>
        </div>
      </MDBCollapse>

      <MDBNavbar expand="lg" light bgColor="white" className="topNav">
        <MDBContainer fluid>
          <MDBNavbarNav className="d-flex flex-row align-items-center w-auto">
            <MDBNavbarToggler
              type="button"
              aria-label="Toggle navigation"
              onClick={toggleShow}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBNavbarBrand href="#">
              <img
                src="https://tfp-global.org/wp-content/uploads/2020/09/eTrash2Cash_Official.jpg"
                height="30"
                alt=""
                loading="lazy"
              />
            </MDBNavbarBrand>

            <MDBCollapse navbar>
              <MDBNavbarItem className="d-flex align-items-center">
                <MDBInput
                  label='Search (ctrl + "/" to focus)'
                  id="form1"
                  type="text"
                />
                <MDBIcon fas icon="search mx-2" />
              </MDBNavbarItem>
            </MDBCollapse>
          </MDBNavbarNav>
          <MDBNavbarNav className="d-flex flex-row justify-content-end w-auto nnn">
            <MDBNavbarItem className="me-3 me-lg-0 d-flex align-items-center">
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  href="#!"
                  className="hidden-arrow nav-link"
                >
                  <MDBIcon fas icon="bell" size="1x" />
                  <MDBBadge color="danger" notification pill>
                    1
                  </MDBBadge>
                </MDBDropdownToggle>

                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownItem href="#">Some news</MDBDropdownItem>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownItem href="#">Another news</MDBDropdownItem>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownItem href="#">
                      Something else here
                    </MDBDropdownItem>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem className="me-3 me-lg-0">
              <MDBNavbarLink href="#">
                <MDBIcon fas icon="fill-drip" />
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className="me-3 me-lg-0">
              <MDBNavbarLink href="#">
                <MDBIcon fab icon="github" />
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem className="me-3 me-lg-0 d-flex align-items-center">
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  href="#!"
                  className="hidden-arrow nav-link"
                >
                  <img
                    src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                    className="rounded-circle"
                    height="22"
                    alt=""
                    loading="lazy"
                  />
                </MDBDropdownToggle>

                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownItem href="#">My profile</MDBDropdownItem>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownItem href="#">Settings</MDBDropdownItem>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownItem href="#">Logout</MDBDropdownItem>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Sidebar;
