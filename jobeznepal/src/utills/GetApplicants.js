
import React, { useEffect, useState } from 'react'
import Api from './Api';

export const GetApplicants = () => {

    const [applicantsDatas, setApplicantsDatas] = useState([])

    const fetchapplicantsData = async () => {
        try {
          const getapplicantsData = await Api.get(
            "/allApplicants"
          );
          setApplicantsDatas(getapplicantsData.data.findApplicants);
        } catch (error) {
          console.log(error.response);
        }
      };
      useEffect(()=>{
        fetchapplicantsData()
      },[])
  return  applicantsDatas;
}
