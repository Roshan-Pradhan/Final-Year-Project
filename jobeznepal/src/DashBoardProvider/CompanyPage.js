import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useState } from "react";
import "../DashBoard/UserInfoSideBar.css"
import PostJobs from "./PostJobs";

const CompanyPage = ({ loggedInCompanyExtraData }) => {
  return (
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
              <button className="editButton">Edit</button>
              <form className="customAutoForm">
                <fieldset className="customFieldSet" style={{ border: "none" }}>
                  <legend style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Company Name
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInCompanyExtraData.companyName}
                    disabled={true}
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
                   Company Email
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInCompanyExtraData.companyEmail}
                    disabled={true}
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
                    Company Number
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInCompanyExtraData.companyNumber}
                    disabled={true}
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
                    Company Type
                  </legend>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="customFormItem"
                    defaultValue={loggedInCompanyExtraData.companyType}
                    disabled={true}
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
                    defaultValue={loggedInCompanyExtraData.selectedValueProvince}
                    disabled={true}
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
                    defaultValue={loggedInCompanyExtraData.
                      selectedValueDistrict
                      }
                    disabled={true}
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
                    defaultValue={loggedInCompanyExtraData.selectedValueStreet
                    }
                    disabled={true}
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
              <h4 className="hrLines">Post Jobs</h4>
              <br />
              <PostJobs loggedInCompanyExtraData={loggedInCompanyExtraData} />
              </div>
           
          </>
        </Content>
      </Layout>
      <Footer style={{
        background:"#EFE2BA",
        padding:"20px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"

      }}>Namaste Ma Footer</Footer>
    </>
  );
};

export default CompanyPage;
