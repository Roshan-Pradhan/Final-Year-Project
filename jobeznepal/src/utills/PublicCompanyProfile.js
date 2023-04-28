
import React, { useEffect, useState } from 'react'
import Api from './Api';

export const PublicCompanyProfile = () => {
    const [publicCompanyInfo, setPublicCompanyInfo] = useState([])
    const fetchCompanyExtraInfo = async () => {
        try {
          const getCompanyExtraInfo = await Api.get(
            "/publicCompanyExtraInfo"
          );
          setPublicCompanyInfo(getCompanyExtraInfo.data.findpublicCompanyExtraData);
        } catch (error) {
          console.log(error.response);
        }
      };
      useEffect(()=>{
        fetchCompanyExtraInfo()
      },[])

  return  publicCompanyInfo;
}
