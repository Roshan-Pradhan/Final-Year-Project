import React, { useEffect, useState } from 'react'
import Api from './Api';

export const AllOpenedJobs = () => {
    const [currentOpenedJob, setCurrentOpenedJob] = useState([])
    
    const fetchallJobsData = async () => {
        try {
          const getallJobsData = await Api.get(
            "/getOpenedJob"
          );
          setCurrentOpenedJob(getallJobsData.data.findPostedJobs);
        } catch (error) {
          console.log(error.response);
        }
      };
      useEffect(()=>{
        fetchallJobsData()
      },[])
  return  currentOpenedJob;
}
