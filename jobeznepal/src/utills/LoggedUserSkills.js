
import React, { useEffect, useState } from 'react'
import Api from './Api';
    import { idFunction } from './LoggedInUserID';

export const LoggedUserSkills = () => {
    const loggedInUserID = idFunction();
    const [userSkillsDetails, setUserSkillsDetails] = useState()

    const fetchUserSkillsInfo = async () => {
        try {
          const getUserSkillsInfo = await Api.get(
            `/getUserSkills/${loggedInUserID}`
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
