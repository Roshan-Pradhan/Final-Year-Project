import { Layout, message } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useState } from "react";
import "./UserInfoSideBar.css";
import Academic from "./Academic";
import Skills from "./Skills";
import { province, districts } from "../ExternalData/Nepal";
import Api from "../utills/Api";

const UserInfoSideBar = ({ loggedInUserExtraData }) => {
  const [inputEdit, setInputEdit] = useState(true);
  const [userProfileData, setUserProfileData] = useState(loggedInUserExtraData);
  const {
    _id,
    userName,
    userEmail,
    userNumber,
    userGender,
    userDOB,
    selectedValueProvince,
    selectedValueDistrict,
    selectedValueStreet,
  } = loggedInUserExtraData;

  const [userEditData, setUserEditData] = useState({
    id: _id,
    username: userName,
    email: userEmail,
    mobilenumber: userNumber,
    gender: userGender,
    dob: userDOB,
    province: selectedValueProvince,
    district: selectedValueDistrict,
    street: selectedValueStreet,
  });
console.log(userEditData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userEditData", JSON.stringify(userEditData));
    try {
      const updateProfile = await Api.put("/updateProfile", formData);
      message.success(updateProfile.data.Mesaage);
      if (updateProfile.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data);
    }
  };

  return (
    <>
      <Layout className="layoutAntd" style={{}}>
        {/* <Sider
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
        </Sider> */}
        <Content
          style={{
            backgroundColor: "white",
          }}
        >
          <>
            <div className="personalDetails" id="personalDetails">
              <br />
              <h4 className="hrLines">Personal Information</h4>
              <button
                className="editButton"
                onClick={() => setInputEdit(!inputEdit)}
              >
                Edit
              </button>
              <br />
              <form
                className="customAutoForm selectform"
                onSubmit={handleSubmit}
              >
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Name
                  </legend>
                  <input
                    defaultValue={userProfileData.userName}
                    className={inputEdit ? "normalShowInout" : "editInput"}
                    onChange={handleInputChange}
                    disabled={inputEdit}
                    type="text"
                    name="username"
                    required
                  />
                </fieldset>
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Email
                  </legend>
                  <input
                    className={inputEdit ? "normalShowInout" : "editInput"}
                    onChange={handleInputChange}
                    type="text"
                    defaultValue={userProfileData.userEmail}
                    name="email"
                    required
                    disabled={inputEdit}
                  />
                </fieldset>
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    PhoneNumber
                  </legend>
                  <input
                    className={inputEdit ? "normalShowInout" : "editInput"}
                    onChange={handleInputChange}
                    type="number"
                    defaultValue={userProfileData.userNumber}
                    disabled={inputEdit}
                    name="mobilenumber"
                    required
                  />
                </fieldset>
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Gender
                  </legend>
                  <select
                    name="gender"
                    className={inputEdit ? "normalShowInout" : "editInput"}
                    onChange={handleInputChange}
                    required
                    defaultValue={userProfileData.userGender}
                    disabled={inputEdit}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </fieldset>
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Date of Birth
                  </legend>
                  <input
                    type="date"
                    name="dob"
                    className={inputEdit ? "normalShowInout" : "editInput"}
                    onChange={handleInputChange}
                    defaultValue={userProfileData.userDOB}
                    disabled={inputEdit}
                  />
                </fieldset>
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Province
                  </legend>
                  <select
                    name="province"
                    className={inputEdit ? "normalShowInout" : "editInput"}
                    onChange={handleInputChange}
                    required
                    defaultValue={userProfileData.selectedValueProvince}
                    disabled={inputEdit}
                  >
                    {province?.map((pData, index) => (
                      <option key={index} value={pData.label}>
                        {pData.value}
                      </option>
                    ))}
                  </select>
                </fieldset>

                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    District
                  </legend>
                  <select
                    name="district"
                    className={inputEdit ? "normalShowInout" : "editInput"}
                    onChange={handleInputChange}
                    defaultValue={userProfileData.selectedValueDistrict}
                    disabled={inputEdit}
                  >
                    {districts
                      ?.filter(
                        (selectedProvince) =>
                          selectedProvince.province_id === userEditData.province
                      )
                      .map((dData, index) => (
                        <option key={index} value={dData.name}>
                          {dData.name}
                        </option>
                      ))}
                  </select>
                </fieldset>
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    City/Village
                  </legend>
                  <input
                    className={inputEdit ? "normalShowInout" : "editInput"}
                    onChange={handleInputChange}
                    type="text"
                    name="street"
                    required
                    defaultValue={userProfileData.selectedValueStreet}
                    disabled={inputEdit}
                  />
                </fieldset>
                <br />
                {!inputEdit &&
                <input className="submitButton" type="submit" value="Submit" />
                }
              </form>
            </div>
            <br />
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
      <Footer
        style={{
          background: "#EFE2BA",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Namaste Ma Footer
      </Footer>
    </>
  );
};

export default UserInfoSideBar;
