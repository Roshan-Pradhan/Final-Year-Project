import React, { useEffect, useState } from "react";
import { GetApplicants } from "../utills/GetApplicants";
import { CompanyProfile } from "../utills/CompanyProfile";
import "./CompanyHomePage.css";
import Api from "../utills/Api";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import {
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
const CompanyHomePage = () => {
  const navigate = useNavigate();
  const [jobID, setJobID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [applicantInfo, setApplicantInfo] = useState([]);
  const [userExtraProfile, setUserExtraProfile] = useState()
  const [userEduDetails, setUserEduDetails] = useState("");
  const [appliedJobDetails, setAppliedJobDetails] = useState([]);
  const [resumeDataSkills, setResumeDataSkills] = useState([]);

  const [modelOpen, setModelOpen] = useState(false);
  const applicantsDatas = GetApplicants();
  const activeCompany = CompanyProfile();

  const activeCompanyApplicants = applicantsDatas?.filter(
    (item) => item.appliedCompany === activeCompany?._id
  );

  const matchingJobApplicants = activeCompanyApplicants.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      const matchingItems = array
        .slice(currentIndex + 1)
        .filter((item) => item.appliedJobID === currentValue.appliedJobID);
      if (matchingItems.length > 0) {
        return [...accumulator, currentValue, ...matchingItems];
      }
      return accumulator;
    },
    []
  );

  const uniqueApplicants = activeCompanyApplicants.reduce((acc, arr) => {
    const { applicantID } = arr;
    const existingApplicants = acc.find((d) => d.value === applicantID);
    if (existingApplicants) {
      existingApplicants.count += 1;
    } else {
      acc.push({ value: applicantID, count: 1 });
    }
    return acc;
  }, []);

  const getTotalApplicants = uniqueApplicants?.map((item) => item.value);

  const fetchApplicantsDetails = async () => {
    try {
      const getAppicantsDetails = getTotalApplicants.map((applicantid) =>
        Api.get(`/applicantDatWithID/${applicantid}`)
      );
      const fetchedData = await Promise.all(getAppicantsDetails);
      const gotData = fetchedData.map((result) => result.data.applicants);
      setApplicantInfo(gotData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickID = async (userID) => {
    const extractUser = activeCompanyApplicants.filter(
      (item) => item.applicantID === userID
    );
    const extractAppliedJobID = extractUser.map((item) => item.appliedJobID);
    setIsLoading(true);

    try {
      const getJobDetails = extractAppliedJobID.map((appliedJobID) =>
        Api.get(`/getAppliedJob/${appliedJobID}`)
      );
      const fetchedData = await Promise.all(getJobDetails);
      const gotData = fetchedData.map((result) => result.data.applicants);
      setAppliedJobDetails(gotData);
      //   setApplicantInfo(gotData);
    } catch (error) {
      console.log(error);
    }
    try {
      const getData = await Api.get(`/userExtraInfo/${userID}`);
      setUserExtraProfile(getData.data.finduserExtraData);
    } catch (error) {
      console.log(error);
      
    }

    try {
      const getData = await Api.get(`/getUserEducation/${userID}`);
      console.log(getData.data.finduser);
      setUserEduDetails(getData.data.finduser);
    } catch (error) {
      console.log(error);
    }
    try {
      const getResumeData = await Api.get(`userResumeData/${userID}`);
      setResumeDataSkills(JSON.parse(getResumeData.data.finduserResume.skills));
    } catch (error) {
      console.log(error);
    }
    setModelOpen(true);
    setIsLoading(false);
  };

  const handleTitleClick = (jobID) => {
    setJobID(jobID);

    navigate(`/singleJobPage/${jobID}`);
  };

  useEffect(() => {
    fetchApplicantsDetails();
  }, [applicantsDatas, activeCompany]);


  return (
    <>
      <div className="shownoofspplicants">
        <div className="totalapplicants">
          <h4>Total Applicants</h4>
          <h4>{activeCompanyApplicants.length}</h4>
        </div>
        {/* <div className="totalapplicants">
          <h4>JOBA Applicants</h4>
          <h4>{matchingJobApplicants.length}</h4>
        </div> */}
      </div>
      <h4 className="hrLines">Applicants Details</h4>

      <div className="applicantData">
        {applicantInfo.map((subArray) =>
          subArray.map((obj) => (
            <>
              <div className="applicantmaindiv" key={obj._id}>
                <div className="applicantImage">
                  <img
                    src={`http://localhost:8001${obj.profileImg}`}
                    alt={obj.userName}
                    className="applicantImg"
                  />
                </div>
                <div key={obj.loggedInUserID} className="applicantSubDIv">
                  <h3 onClick={() => handleClickID(obj.loggedInUserID)}>
                    {obj.userName}
                  </h3>
                  <p>{obj.userEmail}</p>
                  <p>{obj.userNumber}</p>
                  <div className="location">
                    <p>{obj.selectedValueProvince},</p>
                    <p>{obj.selectedValueDistrict},</p>
                    <p>{obj.selectedValueStreet}</p>
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
      {isLoading ? (
        <ReactLoading
          className="customReactLoadingApplied"
          type="cubes"
          color="red"
        />
      ) : (
        <Modal
          title="Job Applicants Details"
          centered
          maskClosable={true}
          open={modelOpen}
          onCancel={() => setModelOpen(false)}
          cancelText="Cancel"
          className="appliedModal"
        >
          <>
            <p className="appliedFor">
              Applied For:
              <span>{appliedJobDetails.length} Jobs</span>
            </p>
            {appliedJobDetails.map((item,index) => (
              <div className="appliedJObs" key={index} >
                {item.jobsData.map((jobsDataItem, index) => {
                  const validjobData = JSON.parse(jobsDataItem);
                  return (
                    <div key={item._id}>
                      <h1
                        className="MainTitle"
                        onClick={() => handleTitleClick(item._id)}
                      >
                        {validjobData.companyName}
                      </h1>
                    </div>
                  );
                })}
              </div>
            ))}
            <br />
            <p className="appliedFor">Applicants Details:</p>
            <div className="applicantData">
                  <>
                    <div className="personalDetails">
                      <h5>
                        <MailOutlined className="customIcons" />
                        {userExtraProfile?.userEmail}
                      </h5>
                      <h5>
                        <PhoneOutlined className="customIcons" />
                        {userExtraProfile?.userNumber}
                      </h5>
                      <div className="address">
                        <h5>
                          <PushpinOutlined className="customIcons" />
                          Province{" "}
                          {userExtraProfile?.selectedValueProvince}, {}{" "}
                        </h5>
                        <h5>
                          {" "}
                          {userExtraProfile?.selectedValueDistrict}
                        </h5>
                        <h5>,{userExtraProfile?.selectedValueStreet}</h5>
                      </div>
                    </div>
                  </>
            </div>
            <br />
            <p className="appliedFor">Applicants Qualification:</p>

            {userEduDetails.length !== 0 && (
              <>
                <div className="educationDiv">
                  {userEduDetails.userEducation.map((key, index) => (
                    <div className="educationData" key={index}>
                      <fieldset>
                        <legend>Qualification</legend>
                        <h1 className="educationItem">
                          {key.Qualification.toUpperCase()}
                        </h1>
                      </fieldset>
                      <fieldset>
                        <legend>Course</legend>
                        <h1 className="educationItem">
                          {" "}
                          {key.Course.toUpperCase()}
                        </h1>
                      </fieldset>
                    </div>
                  ))}
                </div>
              </>
            )}
            <br />
            <p className="appliedFor">Applicants Skills:</p>
            {resumeDataSkills.length !== 0 && (
              <div className="appliedResume">
                {resumeDataSkills.map((item, index) => (
                  <div className="applicantsskills" key={index}>
                    <h3>{item.name.toUpperCase()}</h3>
                  </div>
                ))}
              </div>
            )}
          </>
        </Modal>
      )}
      <div className="adjust" style={{ marginBottom: "13%" }}></div>
    </>
  );
};

export default CompanyHomePage;
