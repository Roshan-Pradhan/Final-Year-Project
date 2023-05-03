import React, { useEffect, useState } from "react";
import "./AllJobs.css";
import { AllOpenedJobs } from "../utills/AllOpenedJobs";

import AllJobsPosts from "./AllJobsPosts";
import { SeekerAppliedJobs } from "../utills/SeekerAppliedJobs";

const AllJobs = () => {
  const allOpenJobs = AllOpenedJobs();
  const alreadyAppliedJob = SeekerAppliedJobs();

  const [totalJobs, setTotalJobs] = useState([]);
  const [activeHeading, setActiveHeading] = useState(0);
  const [showChipsLocation, setShowChipsLocation] = useState(false)
  const [showChipsCompany, setShowChipsCompany] = useState(false)
  const [searchTerm, setSearchTerm] = useState()

  let filterAppliedJobs;
  if(alreadyAppliedJob !==0) {
     filterAppliedJobs = allOpenJobs?.filter((item)=>!alreadyAppliedJob.includes(item._id))
  }

  useEffect(() => {
    setTotalJobs(filterAppliedJobs);
  }, [alreadyAppliedJob,allOpenJobs]);

  const districtCounts = allOpenJobs.reduce((acc, job) => {
    const { selectedValueDistrict } = job;

    const existingDistrict = acc.find((d) => d.value === selectedValueDistrict);

    if (existingDistrict) {
      existingDistrict.count += 1;
    } else {
      acc.push({ value: selectedValueDistrict, count: 1 });
    }
    return acc;
  }, []);

  const companyNameCounts = allOpenJobs.reduce((acc, job) => {
    const { companyBcName } = job;
    const existingDistrict = acc.find((d) => d.value === companyBcName);
    if (existingDistrict) {
      existingDistrict.count += 1;
    } else {
      acc.push({ value: companyBcName, count: 1 });
    }
    return acc;
  }, []);

  const handleDefaultJobs = () =>{
    setActiveHeading(0)
    setShowChipsLocation(false)
    setShowChipsCompany(false)
    const getallJobs = allOpenJobs;
    setTotalJobs(getallJobs)
  }
  const handleFilterCall = () => {
    setActiveHeading(1)
    setShowChipsCompany(false)
    setShowChipsLocation(true)
    const getallJobs = allOpenJobs;
    setTotalJobs(getallJobs)
  };
  const handleCompany = () => {
    setActiveHeading(2)
    setShowChipsLocation(false)
    setShowChipsCompany(true)
    const getallJobs = allOpenJobs;
    setTotalJobs(getallJobs)
  };

  const handleTotalJobsLocation = (e) => {
    setActiveHeading(1)
    const filterLocation = allOpenJobs?.filter(
      (data) => data.selectedValueDistrict === e
    );
    console.log(filterLocation);
    setTotalJobs(filterLocation);
  };
  const handleTotalJobsCompany = (e) => {
    setActiveHeading(2)
    const filterLocation = allOpenJobs?.filter(
      (data) => data.companyBcName === e
    );
    console.log(filterLocation);
    setTotalJobs(filterLocation);
  };

const searchValue =(e) =>{
  setSearchTerm(e.target.value)
}

const handleKeyDown =() =>{
  const filteredJobsData = allOpenJobs.filter((job) => {
    const validjobData = JSON.parse(job?.jobsData);
    const validKeySkills = JSON.parse(job?.Keyskills);
    const mapSkills = validKeySkills.map((skills)=> skills.name) 
    const jobDescriptions = [validjobData.companyName, ...mapSkills]; 
    return jobDescriptions.some((desc) => desc?.toLowerCase().includes(searchTerm?.toLowerCase()));
  });
    setTotalJobs(filteredJobsData);

}

const handleSearchTerm =() =>{
  const filteredJobsData = allOpenJobs.filter((job) => {
    const validjobData = JSON.parse(job?.jobsData);
    const validKeySkills = JSON.parse(job?.Keyskills);
    const mapSkills = validKeySkills.map((skills)=> skills.name) 
    const jobDescriptions = [validjobData.companyName, ...mapSkills]; 
    return jobDescriptions.some((desc) => desc?.toLowerCase().includes(searchTerm?.toLowerCase()));
  });
  setTotalJobs(filteredJobsData);
}

  return (
    <>
   
      <div className="searchField">
        <br />
        <div className="searchView">
          <input
            type="text"
            placeholder="Search Jobs with title or skills....."
            className="searchJobs"
            onChange={searchValue}
            onKeyUp={handleKeyDown}
          />
          <input type="submit" value="Search" className="searchButton" onClick={handleSearchTerm}  />
        </div>
   
        <div className="filtermethod">
          <div className="filterField">
            <h1 className={activeHeading === 0 ? 'active' : 'filterButton'}  onClick={() => handleDefaultJobs()}>AllJobs</h1>
            <h1 className={activeHeading === 1 ? 'active' : 'filterButton'} onClick={() => handleFilterCall()}>Browse By Location</h1>
            <h1 className={activeHeading === 2 ? 'active' : 'filterButton'} onClick={()=>handleCompany()}>Browse By Company</h1>
          </div>
        </div>
      </div>
      <br />

      {showChipsLocation && 
      <div className="browsebyLocation" >
      {districtCounts.map(({ value, count }) => (
        <div className="locations" key={value} onClick={()=>handleTotalJobsLocation(value)}>
          <h1>
            {value} ({count})
          </h1>
        </div>
      ))}
    </div>
      }
      
      {showChipsCompany && 
      <div className="browsebyLocation" >
      {companyNameCounts.map(({ value, count }) => (
        <div className="locations" key={value} onClick={()=>handleTotalJobsCompany(value)}>
          <h1>
            {value} ({count})
          </h1>
        </div>
      ))}
    </div>
      }

     <AllJobsPosts  totalJobs={totalJobs}/>
    </>
  );
};

export default AllJobs;
