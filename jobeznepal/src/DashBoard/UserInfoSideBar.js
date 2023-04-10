import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { province, districts } from "../ExternalData/Nepal";
import React, { useState } from "react";
import "./UserInfoSideBar.css";
import Academic from "./Academic";
import Skills from "./Skills";

const UserInfoSideBar = ({ loggedInUserExtraData }) => {
  const [selectedValueProvince, setSelectedValueProvince] = useState("1");
  const [selectedValueDistrict, setSelectedValueDistrict] = useState("");
  const [selectedValueStreet, setSelectedValueStreet] = useState("");

  const handleSelect = (e) => {
    setSelectedValueProvince(e.target.value);
  };
  const handleSelectDistrict = (e) => {
    setSelectedValueDistrict(e.target.value);
  };
  const handleChangeStreet = (e) => {
    setSelectedValueStreet(e.target.value);
  };


  return (
    <>
      <Layout className="layoutAntd" style={{}}>
        <Sider
          className="siderAntd"
          style={{
            backgroundColor: "#EFE2BA",
          }}
        >
          <div
            className="alinks"
            style={{
              display: "flex",
              flexDirection: "column",
              position: "sticky",
              top: "0",
            }}
          >
            <a href={"#personalDetails"} className="link">
              Personal Information
            </a>
            <a href={"#academicDetails"} className="link">
              Academic Information
            </a>
            <a href={'#skillsDetails'} className="link">
              Skills
            </a>
          </div>
        </Sider>
        <Content
          style={{
            backgroundColor: "white",
          }}
        >
          <>
            <div className="personalDetails" id="personalDetails">
              <br />
              <h4 className="hrLines">Personal Information</h4>
              <button className="editButton">Edit</button>
              <form className="customAutoForm">
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Name
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInUserExtraData.userName}
                    disabled="true"
                    style={{
                      paddingLeft: "0px",
                      fontWeight: "600",
                      fontSize: "17px",
                      backgroundColor: "none",
                    }}
                  />
                </fieldset>
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Email
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInUserExtraData.userEmail}
                    disabled="true"
                    style={{
                      paddingLeft: "0px",
                      fontWeight: "600",
                      fontSize: "17px",
                      backgroundColor: "none",
                    }}
                  />
                </fieldset> 
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    PhoneNumber
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInUserExtraData.userNumber}
                    disabled="true"
                    style={{
                      paddingLeft: "0px",
                      fontWeight: "600",
                      fontSize: "17px",
                      backgroundColor: "none",
                    }}
                  />
                </fieldset>
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Gender
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInUserExtraData.userGender}
                    disabled="true"
                    style={{
                      paddingLeft: "0px",
                      fontWeight: "600",
                      fontSize: "17px",
                      backgroundColor: "none",
                    }}
                  />
                </fieldset>
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Date of Birth
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInUserExtraData.userDOB}
                    disabled="true"
                    style={{
                      paddingLeft: "0px",
                      fontWeight: "600",
                      fontSize: "17px",
                      backgroundColor: "none",
                    }}
                  />
                </fieldset>
                
                 <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Province
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInUserExtraData.selectedValueProvince}
                    disabled="true"
                    style={{
                      paddingLeft: "0px",
                      fontWeight: "600",
                      fontSize: "17px",
                      backgroundColor: "none",
                    }}
                  />
                </fieldset> <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    District
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInUserExtraData.
                      selectedValueDistrict
                      }
                    disabled="true"
                    style={{
                      paddingLeft: "0px",
                      fontWeight: "600",
                      fontSize: "17px",
                      backgroundColor: "none",
                    }}
                  />
                </fieldset> <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    City/Village
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInUserExtraData.selectedValueStreet
                    }
                    disabled="true"
                    style={{
                      paddingLeft: "0px",
                      fontWeight: "600",
                      fontSize: "17px",
                      backgroundColor: "none",
                    }}
                  />
                </fieldset>
              </form>
              <br />
            </div>
              <div id="academicDetails">
              <h4 className="hrLines">Academic Information</h4>
              <br />
              <Academic />
              </div>
            <br />
            <div id="skillsDetails">
              <h4 className="hrLines">Skills and Training</h4>
              <br />
              <Skills />
              </div>
          </>
        </Content>
      </Layout>
      <Footer>Namaste Ma Footer</Footer>
    </>
  );
};

export default UserInfoSideBar;
