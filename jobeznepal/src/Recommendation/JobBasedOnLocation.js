import React, { useEffect, useState } from "react";
import Api from "../utills/Api";
import "./Recommendation.css";
import { useNavigate } from "react-router-dom";
import {
  DeploymentUnitOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  PushpinOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import ReactLoading from "react-loading";

const JobBasedOnLocation = ({ cosineSimilarity,recmndTitle }) => {
  const navigate = useNavigate();

  const similarJobs = cosineSimilarity.filter((item) => item.similarity > 0);
  const sortSimilarJobs = similarJobs.sort((a,b)=>b.similarity-a.similarity);
  const similarJobsIds = sortSimilarJobs.map((item) => item.id);

  const [getRecommendedJobs, setGetRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobID, setJobID] = useState(null);

  const fetchRecommendedJobs = async () => {
    setLoading(true);
    try {
      const jobRequests = similarJobsIds.map((jobsID) =>
        Api.get(`/getRcmndJobs/${jobsID}`)
      );
      const jobsData = await Promise.all(jobRequests);
      const recommendedJobs = jobsData.map((result) => result.data.findjobs);
      // console.log(recommendedJobs);
      setGetRecommendedJobs(recommendedJobs);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // console.log(getRecommendedJobs)

  useEffect(() => {
    fetchRecommendedJobs();
  }, [cosineSimilarity]);

  const handleTitleClick = (jobID) => {
    setJobID(jobID);
    navigate(`/singleJobPage/${jobID}`);
  };

  return (
    <>
      {loading ? (
        <>
          <div className="customLoading">
            <ReactLoading
              className="customReactLoading"
              type="cubes"
              color="red"
            />
          </div>
        </>
      ) : (
        
        <>
        {getRecommendedJobs != 0 ? 
        (
          <>
          <div className="locationRECOMMEND">
          <PushpinOutlined className="recomIcon" />
          <h3>{recmndTitle}</h3>
        </div>
        <div className="postedJobsDetails locationRecommend">
          {getRecommendedJobs.map((item, index) => (
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
        </>
        ):(
          <>
           <div className="locationRECOMMEND">
          <PushpinOutlined className="recomIcon" />
          <h3>{recmndTitle}</h3>
        </div>
          <h1 className="errorOfnoJOb">Sorry! No any recommendation found</h1>
           </>
        )
      }
         
        </>
      )}
    </>
  );
};

export default JobBasedOnLocation;
