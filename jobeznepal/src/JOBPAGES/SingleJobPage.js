import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../utills/Api";
import {
  DeploymentUnitOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  PushpinOutlined,
  RiseOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import ReactLoading from "react-loading";
import { CompanyProfile } from "../utills/CompanyProfile";
import "./SingleJobPage.css";
import "../DashBoardProvider/CompanyJobPage.css";
import { PublicCompanyProfile } from "../utills/PublicCompanyProfile";
import { idFunction } from "../utills/LoggedInUserID";
import { message } from "antd";
import { SeekerAppliedJobs } from "../utills/SeekerAppliedJobs";
const SingleJobPage = () => {
  const loggedInUserID = idFunction();
  const companyInfo = CompanyProfile();
  const publicCompanyInfo = PublicCompanyProfile();
  const alreadyAppliedJob = SeekerAppliedJobs();

  const [isLoading, setIsLoading] = useState(false);
  const { jobID } = useParams();
  const [singleJobDetails, setSingleJobDetails] = useState([]); // Change initial state to null
  const loggedInUser = JSON.parse(
    window.localStorage.getItem("jobeznepalUser")
  );
  let loggedInUserType = loggedInUser.doUserExist.usertype;
  const JobsDetails = async () => {
    setIsLoading(true);
    try {
      const getJobsDetails = await Api.get(`/getSingleJobs/${jobID}`);
      setSingleJobDetails(getJobsDetails.data.findjob);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const publicCompanyInfoFilter = publicCompanyInfo?.filter(
    (data) => data._id === singleJobDetails?.companyId
  );
  useEffect(() => {
    if (jobID) {
      JobsDetails();
    }
  }, [jobID]);
  // Parse the JSON-encoded strings and access individual properties
  const jobData =
    singleJobDetails?.jobsData && singleJobDetails.jobsData.length > 0
      ? JSON.parse(singleJobDetails.jobsData[0])
      : {};
  const keySkills =
    singleJobDetails?.Keyskills && singleJobDetails.Keyskills.length > 0
      ? JSON.parse(singleJobDetails.Keyskills[0])
      : [];
  const skills =
    singleJobDetails?.Skills && singleJobDetails.Skills.length > 0
      ? JSON.parse(singleJobDetails.Skills[0])
      : [];
  const qualification =
    singleJobDetails?.selectedValueQualification &&
    singleJobDetails.selectedValueQualification.length > 0
      ? singleJobDetails.selectedValueQualification[0].split(",")
      : [];
  // Render the single job details
  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dateString = singleJobDetails?.createdAt;
  const date = new Date(dateString);
  date.setDate(date.getDate() + 15);
  const futureDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleApplyClick = async (applyJobID) => {
    if (applyJobID && loggedInUserID) {
      console.log("hello");
      try {
        const applyDetails = await Api.post("/appliedUserDetails", {
          appliedCompany: publicCompanyInfoFilter[0]?._id,
          applyJobID,
          loggedInUserID,
        });
        message.success({
          content: applyDetails.data.Message,
          duration: 3,
        });
      } catch (error) {
        message.error({
          content: error.response.data,
          duration: 3,
        });
      }
    }
    // console.log(applyJobID,loggedInUserID)
  };
  const checkApplied = alreadyAppliedJob.includes(jobID);
console.log(checkApplied)
  return (
    <>
      {isLoading ? (
        <div className="customLoading">
          <ReactLoading
            className="customReactLoading"
            type="cubes"
            color="red"
          />
        </div>
      ) : (
        <div className="companyDetails">
          <div className="companyImg">
            <img
              src={`http://localhost:8001${publicCompanyInfoFilter[0]?.profileImg}`}
              alt={publicCompanyInfoFilter.companyName}
              className="singlePageBG"
            />
          </div>
          <br />
          <div className=" singleJObPageDetails ">
            <h5 className="subTitleJob">Job Specification</h5>
            <div className=" singlePagepostedJOb">
              <div className="titleanddate">
                <h5 className="subTitle expiryDate">
                  Apply Before: {futureDate}
                </h5>
                <h1 className="MainTitle">{jobData.companyName}</h1>
              </div>
              <h5 className="subTitle">{companyInfo.companyName}</h5>
              <div className="jobaddress">
                <h5 className="subTitle">
                  <UsergroupAddOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Vacancy: &nbsp;</h5>
                <h5 className="mainText">{jobData.vacancyNumber}</h5>
              </div>
              <div className="jobaddress">
                <h5 className="subTitle">
                  <DollarCircleOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Offered Salary: &nbsp;</h5>
                {jobData.jobSalary !== "" ? (
                  <h5 className="mainText">{jobData.jobSalary}</h5>
                ) : (
                  <h5 className="mainText">Negotiable</h5>
                )}
              </div>
              <div className="jobaddress">
                <h5 className="subTitle">
                  <RiseOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Experience: &nbsp;</h5>
                <h5 className="mainText">{jobData.jobExperience} Years</h5>
              </div>

              <div className="jobaddress">
                <h5 className="subTitle">
                  <PushpinOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Location: &nbsp;</h5>
                <h5 className="mainText">
                  Province {singleJobDetails.selectedValueProvince}, &nbsp;
                </h5>
                <h5 className="mainText">
                  {" "}
                  {singleJobDetails.selectedValueDistrict}, &nbsp;{" "}
                </h5>
                <h5 className="mainText">
                  {singleJobDetails.selectedValueStreet}
                </h5>
              </div>
              <div className="jobaddress">
                <h5 className="subTitle">
                  <DeploymentUnitOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Key Skills: &nbsp;</h5>
                <div className="keySkillsRequired">
                  {keySkills.map((difSkills, index) => {
                    return (
                      <div className="diffSkilss" key={index}>
                        <h5 className="mainText">
                          {difSkills.name.toUpperCase()}
                        </h5>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="jobaddress">
                <h5 className="subTitle">
                  <DeploymentUnitOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Qualification: &nbsp;</h5>
                <div className="keySkillsRequired">
                  {qualification.map((difSkills, index) => {
                    return (
                      <>
                        {difSkills !== "" ? (
                          <div className="diffSkilss" key={index}>
                            <h5 className="mainText">
                              {difSkills.toUpperCase()}
                            </h5>
                          </div>
                        ) : (
                          <h5 className="mainText">Not Defined</h5>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="jobaddress">
                <h5 className="subTitle">
                  <DeploymentUnitOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Qualification Field: &nbsp;</h5>
                <div className="keySkillsRequired">
                  {skills.map((difSkills, index) => {
                    return (
                      <>
                        {difSkills.length !== 0 ? (
                          <div className="diffSkilss" key={index}>
                            <h5 className="mainText">
                              {difSkills.name.toUpperCase()}
                            </h5>
                          </div>
                        ) : (
                          <h5 className="mainText">Not Defined</h5>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="jobaddress">
                <h5 className="subTitle">
                  <FieldTimeOutlined className="customIcons" />
                </h5>
                <h5 className="subTitle">Posted On: &nbsp;</h5>
                <h5 className="mainText">
                  {Date.parse(singleJobDetails.createdAt)
                    ? new Date(singleJobDetails.createdAt)
                        .toISOString()
                        .slice(0, 10)
                    : "Invalid Date"}
                </h5>
              </div>
            </div>
            {checkApplied ? (
              <button
                className="appliedBtn"
                disabled={true}
              >
                Already Applied
              </button>
            ) : (
              <>
                {(loggedInUserType !== "provider" && loggedInUserType!== "admin") && (
                  <button
                    className="applyBtn"
                    onClick={() => handleApplyClick(singleJobDetails?._id)}
                  >
                    Apply Now
                  </button>
                )}
              </>
            )}

            <h5 className="subTitleJob">Job Description</h5>
            <div className="jobdescriptionsingle">
              {jobData.myTextarea !== null &&
              jobData.myTextarea !== undefined ? (
                <ul>
                  {jobData.myTextarea
                    .split("\n")
                    .map((jobDescription, index) => (
                      <li key={index}>{jobDescription}</li>
                    ))}
                </ul>
              ) : (
                <h5 className="mainText">{jobData.myTextarea}</h5>
              )}
            </div>
          </div>
          <br />
        </div>
      )}
    </>
  );
};

export default SingleJobPage;
