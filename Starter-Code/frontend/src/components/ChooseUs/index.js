import React from "react";
import "./style.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

import { MDBIcon } from "mdb-react-ui-kit";
const ChooseUs = () => {
  return (
    <div className="choose-us-container">
      <div>
        <h2
          className="choose-us-title"
          style={{
            marginTop: "70px",
            fontFamily: "'Fraunces', serif",
            fontSize: "60px",
            fontWeight: "bold",
          }}
        >
          Why Choose Trash To Cash
        </h2>
        <h3
          className="choose-us-subtitle"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "60px",
            fontWeight: "bold",
          }}
        >
          Recycling Services
        </h3>
        <h4
          className="choose-us-title"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: "25px" }}
        >
          Choose us for convenient doorstep waste collection, eco-friendly
          recycling,
        </h4>
        <h5
          className="choose-us-subtitle"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: "25px" }}
        >
          and transparent processes, all while earning money for your waste.
        </h5>

        <div className="choose-us-wrapper">
          <div className="choose-us-row">
            <div className="choose-us-image-wrapper">
              <img
                src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1739833019/zzoya9oj7lufqokvvpgp.png"
                alt="Choose Us"
                className="choose-us-image"
              />
              {/* <MDBIcon
                fas
                icon="recycle"
                alt="Overlay"
                className="choose-us-overlay"
              /> */}
              <img
                src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1739842890/vj2l6ggdor5fm8zzq1u4.png"
                alt="Overlay"
                className="choose-us-overlay"
                // style={{height:"100px",width:"100px",marginBottom:"30px"}}
              />
              <h3 className="choose-us-text under">2000+</h3>
              {/* <p
                className="choose-us-caption"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "20px",
                }}
              >
                tons over a year, dry waste collected and prevented from
                entering the landfill
              </p> */}
            </div>
            <div className="choose-us-image-wrapper">
              <img
                src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1739833019/zzoya9oj7lufqokvvpgp.png"
                alt="Choose Us"
                className="choose-us-image"
              />
              <img
                src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1739837243/y2wzgd9mtfb5rsarstpb.png"
                alt="Overlay"
                className="choose-us-overlay"
              />
              <h3 className="choose-us-text under">65+</h3>
              {/* <p
                className="choose-us-caption"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "20px",
                }}
              >
                waste workers provided with formal and permanent employment
              </p> */}
            </div>
          </div>
          <div className="choose-us-center">
            <img
              src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1739840438/mnyzn7ltghngs2fr1qk1.png"
              alt="Center Image"
              className="choose-us-center-image"
            />
          </div>
          <div className="choose-us-row">
            <div className="choose-us-image-wrapper">
              <img
                src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1739833019/zzoya9oj7lufqokvvpgp.png"
                alt="Choose Us"
                className="choose-us-image"
              />
              <img
                src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1739836507/exfp6d4gz59mwi1xqcu3.png"
                alt="Overlay"
                className="choose-us-overlay"
                style={{ height: "100px" }}
              />
              <h3 className="choose-us-text under">1600+</h3>
              {/* <p
                className="choose-us-caption"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "20px",
                }}
              >
                tonnes of dry waste recycled and converted to raw materials
              </p> */}
            </div>
            <div className="choose-us-image-wrapper">
              <img
                src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1739833019/zzoya9oj7lufqokvvpgp.png"
                alt="Choose Us"
                className="choose-us-image"
              />
              <img
                src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1739836917/mcgxgzrkpu35ddc96jaj.png"
                alt="Overlay"
                className="choose-us-overlay"
              />
              <h3 className="choose-us-text under">1500+</h3>
              {/* <p
                className="choose-us-caption"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "20px",
                }}
              >
                households involved and are provided with on-demand,
                door-to-door waste collection services
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
