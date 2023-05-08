import React, { useEffect, useState } from "react";
import "../DashBoard/AllJobs.css"
import { AllOpenedJobs } from "../utills/AllOpenedJobs";
import AdminJobList from "./AdminJobList";
import Api from "../utills/Api";

const Admin = () => {
  const allOpenJobs = AllOpenedJobs();

  const [totalJobs, setTotalJobs] = useState([]);

  const fetchallJobsData = async () => {
    try {
      const getallJobsData = await Api.get(
        "/getOpenedJobAdmin"
      );
      setTotalJobs(getallJobsData.data.findPostedJobs);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(()=>{
    fetchallJobsData()
  },[allOpenJobs])

  return (
    <>
     <AdminJobList  totalJobs={totalJobs}/>
    </>
  );
};

export default Admin;
