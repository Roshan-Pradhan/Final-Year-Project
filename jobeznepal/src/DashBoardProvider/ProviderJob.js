import React, { useEffect, useState } from "react";
import Api from "../utills/Api";
import { idFunction } from "../utills/LoggedInUserID";
import {
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import CompanyJobPage from "./CompanyJobPage";
import { CompanyProfile } from "../utills/CompanyProfile";
import { Link } from "react-router-dom";

const ProviderJob = () => {
  const companyInfo = CompanyProfile();
  console.log(companyInfo)

  return (
    <>
      {companyInfo.length !== 0 && (
        <div className="welcomeScreen">
          <div className="profileImg">
            <img
              src={`http://localhost:8001${companyInfo.profileImg}`}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                border: "solid #F13C20",
              }}
              alt="img"
            />
          </div>
          <div className="jobDetails">
            <h3>{companyInfo.companyName}!</h3>
            <h5 className="companyTYpe">{companyInfo.companyType}</h5>
            <h5>
              <MailOutlined className="customIcons" />
              {companyInfo.companyEmail}
            </h5>
            <h5>
              <PhoneOutlined className="customIcons" />
              {companyInfo.companyNumber}
            </h5>
            <div className="address">
              <h5>
                <PushpinOutlined className="customIcons" />
                Province {companyInfo.selectedValueProvince}, {}{" "}
              </h5>
              <h5> {companyInfo.selectedValueDistrict}</h5>
              <h5>,{companyInfo.selectedValueStreet}</h5>
            </div>
          </div>
        </div>
      )}
      <br />
      {companyInfo.length !== 0 ? (
        <>
          <h4 className="hrLines">Current Job Openings</h4>
          <br />
          <CompanyJobPage companyInfo={companyInfo} />
        </>
      ) : (
        <>
        <div className="noJobPosted">
          <h3>No any job posted</h3>
          <Link to="/userProfile">
        <button className="jobsButton">Post Jobs +</button>
          </Link>
        </div>
        </>
      )}
    </>
  );
};

export default ProviderJob;
