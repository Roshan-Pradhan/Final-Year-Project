import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SeekerAppliedJobs } from "../utills/SeekerAppliedJobs";
import Api from "../utills/Api";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import {
  DeploymentUnitOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  PushpinOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
const AppliedJobs = () => {
  const navigate = useNavigate();

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobID, setJobID] = useState(null);
  const [loading, setLoading] = useState(false);

  const appliedJobDetails = SeekerAppliedJobs();

  const fetchAppliedJobs = async () => {
    setLoading(true);
    try {
      const appliedJobsRequest = appliedJobDetails?.map((jobsID) =>
        Api.get(`/getRcmndJobs/${jobsID}`)
      );
      const jobsData = await Promise.all(appliedJobsRequest);
      const appliedJobsResponse = jobsData?.map(
        (result) => result.data.findjobs
      );
      setAppliedJobs(appliedJobsResponse);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleTitleClick = (jobID) => {
    setJobID(jobID);
    navigate(`/singleJobPage/${jobID}`);
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, [appliedJobDetails]);

  return (
    <>
      {loading ? (
        <div className="customLoading">
          <ReactLoading
            className="customReactLoading"
            type="cubes"
            color="red"
          />
        </div>
      ) : (
        <>
          {appliedJobs !== 0 ? (
            <>
              <div style={{minHeight:"100vh"}}>
                <div className="locationRECOMMEND">
                  <PushpinOutlined className="recomIcon" />
                  <h3>Applied Jobs:</h3>
                  <h3>{appliedJobs.length}</h3>
                </div>
                <div className="postedJobsDetails locationRecommend">
                  {appliedJobs.map((item, index) => (
                    <div className="singleJobDetails " key={index}>
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
                              <h5 className="mainText">
                                {validjobData.vacancyNumber}
                              </h5>
                            </div>
                            <div className="jobaddress">
                              <h5 className="subTitle">
                                <DollarCircleOutlined className="customIcons" />
                              </h5>
                              <h5 className="subTitle">
                                Offered Salary: &nbsp;
                              </h5>
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
                                      <h5 className="mainText">
                                        {difSkills.name}
                                      </h5>
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
            </>
          ) : (
            <div className="mainDivAppliedJobs" style={{ height: "66vh" }}>
              <div className="noAppliedJobs">
                <h3>No any job application found!!!</h3>
                <Link to="/alljobs">Apply Jobs</Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AppliedJobs;
