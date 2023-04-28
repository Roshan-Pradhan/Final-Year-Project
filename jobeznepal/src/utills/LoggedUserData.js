
import React, { useEffect, useState } from 'react'
import Api from './Api';
    import { idFunction } from './LoggedInUserID';

export const LoggedUserData = () => {
    const loggedInUserID = idFunction();
    const [userDetails, setUserDetails] = useState()

    const fetchUserExtraInfo = async () => {
        try {
          const getUserExtraInfo = await Api.get(
            `/userExtraInfo/${loggedInUserID}`
          );
          setUserDetails(getUserExtraInfo.data.finduserExtraData);
        } catch (error) {
          console.log(error.response);
        }
      };
      useEffect(()=>{
        fetchUserExtraInfo()
      },[])
  return  userDetails;
}
