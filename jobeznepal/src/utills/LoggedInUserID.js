export const idFunction = () =>{
    const loggedInUser =  JSON.parse(
        window.localStorage.getItem("jobeznepalUser")
      );
      let loggedInUserID = loggedInUser.doUserExist._id;
      return loggedInUserID;
}

