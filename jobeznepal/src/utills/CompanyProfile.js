import React, { useEffect, useState } from 'react'
import {idFunction} from "./LoggedInUserID"
import Api from './Api';

export const CompanyProfile = () => {
    const loggedInUserID = idFunction();
    const [companyInfo, setCompanyInfo] = useState([])
    const fetchCompanyExtraInfo = async () => {
        try {
          const getCompanyExtraInfo = await Api.get(
            `/companyExtraInfo/${loggedInUserID}`
          );
          setCompanyInfo(getCompanyExtraInfo.data.findCompanyExtraData);
        } catch (error) {
          console.log(error.response);
        }
      };
      useEffect(()=>{
        fetchCompanyExtraInfo()
      },[])

  return  companyInfo;
}
