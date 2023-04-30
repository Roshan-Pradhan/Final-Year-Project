import { Layout, message } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useState } from "react";
import "../DashBoard/UserInfoSideBar.css";
import PostJobs from "./PostJobs";
import { province, districts } from "../ExternalData/Nepal";
import Api from "../utills/Api";

const CompanyPage = ({
  loggedInCompanyExtraData,
}) => {
console.log(loggedInCompanyExtraData)
  const [inputEdit, setInputEdit] = useState(true);

  const [companyEditData, setCompanyEditData] = useState({
    id: loggedInCompanyExtraData?._id,
    companyname: loggedInCompanyExtraData?.companyName,
    companyemail: loggedInCompanyExtraData?.companyEmail,
    companynumber: loggedInCompanyExtraData?.companyNumber,
    companytype: loggedInCompanyExtraData?.companyType,
    province: loggedInCompanyExtraData?.selectedValueProvince,
    district: loggedInCompanyExtraData?.selectedValueDistrict,
    street: loggedInCompanyExtraData?.selectedValueStreet,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(companyEditData)
    const formData = new FormData();
    formData.append("companyEditData", JSON.stringify(companyEditData));
    try {
      const updateProfile = await Api.put("/updateCompanyProfile", formData);
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
      {loggedInCompanyExtraData.length !== 0 && (
        <>
          <Layout className="layoutAntd" style={{}}>
            <Content
              style={{
                backgroundColor: "white",
              }}
            >
              <>
                <div className="personalDetails" id="personalDetails">
                  <br />
                  <h4 className="hrLines">Company Information</h4>
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
                    <fieldset
                      className="customFieldSet"
                      style={{ border: "none" }}
                    >
                      <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                        Company Name
                      </legend>
                      <input
                        type="text"
                        name="companyname"
                        className={inputEdit ? "normalShowInout" : "editInput"}
                        defaultValue={loggedInCompanyExtraData.companyName}
                        disabled={inputEdit}
                        onChange={handleInputChange}
                        required
                      />
                    </fieldset>
                    <fieldset
                      className="customFieldSet"
                      style={{ border: "none" }}
                    >
                      <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                        Company Email
                      </legend>
                      <input
                        type="text"
                        name="companyemail"
                        defaultValue={loggedInCompanyExtraData.companyEmail}
                        className={inputEdit ? "normalShowInout" : "editInput"}
                        onChange={handleInputChange}
                        disabled={inputEdit}
                        required
                      />
                    </fieldset>
                    <fieldset
                      className="customFieldSet"
                      style={{ border: "none" }}
                    >
                      <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                        Company Number
                      </legend>
                      <input
                        type="number"
                        name="companynumber"
                        className={inputEdit ? "normalShowInout" : "editInput"}
                        onChange={handleInputChange}
                        defaultValue={loggedInCompanyExtraData.companyNumber}
                        disabled={inputEdit}
                        required
                      />
                    </fieldset>
                    <fieldset
                      className="customFieldSet"
                      style={{ border: "none" }}
                    >
                      <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                        Company Type
                      </legend>
                      <input
                        type="text"
                        name="companytype"
                        className={inputEdit ? "normalShowInout" : "editInput"}
                        onChange={handleInputChange}
                        defaultValue={loggedInCompanyExtraData.companyType}
                        disabled={inputEdit}
                        required
                      />
                    </fieldset>
                    <fieldset
                      className="customFieldSet"
                      style={{ border: "none" }}
                    >
                      <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                        Province
                      </legend>
                      <select
                        name="province"
                        className={inputEdit ? "normalShowInout" : "editInput"}
                        onChange={handleInputChange}
                        defaultValue={loggedInCompanyExtraData.selectedValueProvince}
                        disabled={inputEdit}
                      >
                        {province?.map((pData, index) => (
                          <option key={index} value={pData.label}>
                            {pData.value}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                    <fieldset
                      className="customFieldSet"
                      style={{ border: "none" }}
                    >
                      <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                        District
                      </legend>
                      <select
                        name="district"
                        className={inputEdit ? "normalShowInout" : "editInput"}
                        onChange={handleInputChange}
                        defaultValue={loggedInCompanyExtraData?.selectedValueDistrict}
                        disabled={inputEdit}
                      >
                        {districts
                          ?.filter(
                            (selectedProvince) =>
                              selectedProvince.province_id ===
                              companyEditData.province
                          )
                          .map((dData, index) => (
                            <option key={index} value={dData.name}>
                              {dData.name}
                            </option>
                          ))}
                      </select>
                    </fieldset>
                    <fieldset
                      className="customFieldSet"
                      style={{ border: "none" }}
                    >
                      <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                        City/Village
                      </legend>
                      <input
                        type="text"
                        className={inputEdit ? "normalShowInout" : "editInput"}
                        name="street"
                        onChange={handleInputChange}
                        required
                        defaultValue={
                          loggedInCompanyExtraData.selectedValueStreet
                        }
                        disabled={inputEdit}
                      />
                    </fieldset>
                    <br />
                    {!inputEdit && (
                      <input
                        className="submitButton"
                        type="submit"
                        value="Submit"
                      />
                    )}
                  </form>
                  <br />
                </div>
                <div id="academicDetails">
                  <h4 className="hrLines">Post Jobs</h4>
                  <br />
                  <PostJobs
                    companyIDBackend={loggedInCompanyExtraData._id}
                    companyNameBackend={loggedInCompanyExtraData.companyName}
                    loggedInCompanyExtraData={loggedInCompanyExtraData}
                  />
                </div>
              </>
            </Content>
          </Layout>
         
        </>
      )}
    </>
  );
};

export default CompanyPage;
