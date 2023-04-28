
import React, { useEffect, useState } from 'react'
import Api from './Api';
    import { idFunction } from './LoggedInUserID';

export const LoggedUserQualification = () => {
    const loggedInUserID = idFunction();
    const [userSkillsDetails, setUserSkillsDetails] = useState()

    const fetchUserSkillsInfo = async () => {
        try {
          const getUserSkillsInfo = await Api.get(
            `/getUserQualification/${loggedInUserID}`
          );
          setUserSkillsDetails(getUserSkillsInfo.data.findjobs);
        } catch (error) {
          console.log(error.response);
        }
      };
      useEffect(()=>{
        fetchUserSkillsInfo()
      },[])
  return  userSkillsDetails;
}
