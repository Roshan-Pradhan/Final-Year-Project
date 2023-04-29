import React, { useState } from 'react'
import {
    DeploymentUnitOutlined,
    DollarCircleOutlined,
    FieldTimeOutlined,
    MailOutlined,
    PhoneOutlined,
    PushpinOutlined,
    UsergroupAddOutlined,
  } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AllJobsPosts = ({totalJobs}) => {
    const [jobID, setJobID] = useState(null);
    const navigate = useNavigate();

    const handleTitleClick = (jobID) => {
        setJobID(jobID);
        navigate(`/singleJobPage/${jobID}`);
      };
  return (
    <>
    {totalJobs.length !==0 ? (
  <div className="jobs">
  <h4 className="hrLines">Current Job Openings</h4>
  <div className="postedJobsDetails">
    {totalJobs?.map((item, index) => (
      <div className="singleJobDetails" key={index}>
        {/* -------------------------------- jobsData----------------------------------------- */}
        {item.jobsData.map((jobsDataItem, index) => {
          const validjobData = JSON.parse(jobsDataItem);
          return (
            <div key={index}>
              <h1
                className="MainTitle"
                onClick={() => handleTitleClick(item._id)}
              >
                {validjobData.companyName}
              </h1>
              <div className="jobaddress">
                <h5 className="subTitle">
                  <UsergroupAddOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Vacancy: &nbsp;</h5>
                <h5 className="mainText">{validjobData.vacancyNumber}</h5>
              </div>
              <div className="jobaddress">
                <h5 className="subTitle">
                  <DollarCircleOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Offered Salary: &nbsp;</h5>
                <h5 className="mainText">
                  {validjobData.jobSalary !== "" ? (
                    <h5 className="mainText">
                      {" "}
                      {validjobData.jobSalary}
                    </h5>
                  ) : (
                    <h5 className="mainText">Negotiable</h5>
                  )}
                </h5>
              </div>
            </div>
          );
        })}
        {/* ------------------------------------------------------------------------------------------- */}
        <div className="jobaddress">
          <h5 className="subTitle">
            <PushpinOutlined className="customIcons" />
          </h5>
          <h5 className="subTitle">Location: &nbsp;</h5>
          <h5 className="mainText">
            Province {item.selectedValueProvince}, &nbsp;
          </h5>
          <h5 className="mainText">
            {" "}
            {item.selectedValueDistrict}, &nbsp;{" "}
          </h5>
          <h5 className="mainText">{item.selectedValueStreet}</h5>
        </div>
        {item.Keyskills.map((KeyskillsItem, index) => {
          const validKeyskills = JSON.parse(KeyskillsItem);
          return (
            <div key={index}>
              <div className="jobaddress">
                <h5 className="subTitle">
                  <DeploymentUnitOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Key Skills: &nbsp;</h5>
                <div className="keySkillsRequired">
                  {validKeyskills.map((difSkills, index) => {
                    return (
                      <div className="diffSkilss" key={index}>
                        <h5 className="mainText">{difSkills.name}</h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div className="jobaddress">
          <h5 className="subTitle">
            <FieldTimeOutlined className="customIcons" />
          </h5>
          <h5 className="subTitle">Posted On: &nbsp;</h5>
          <h5 className="mainText">
            {new Date(item.createdAt).toISOString().slice(0, 10)}
          </h5>
        </div>
      </div>
    ))}
  </div>
</div>
    ):(
      <>
      <h3 style={{
        textAlign:"center",
        color:"red"
      }}>Sorry! No jobs matched your search term.</h3>
      </>
    )}
   
    
    </>
  )
}

export default AllJobsPosts