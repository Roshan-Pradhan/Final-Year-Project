import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";
import Api from "../utills/Api";
import "./Profile.css";
import { province, districts } from "../ExternalData/Nepal";
import {
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import UserInfoSideBar from "./UserInfoSideBar";

const Profile = ({ setHomeData }) => {

  const loggedInUser = JSON.parse(
    window.localStorage.getItem("jobeznepalUser")
  );
  let loggedInUserID = loggedInUser.doUserExist._id;

  const [loggedInUserData, setLoggedInUserData] = useState([]);
  const [loggedInUserExtraData, setLoggedInUserExtraData] = useState([]);
  const [profileImg, setProfileImg] = useState("");
// console.log(loggedInUserExtraData)
  const [selectedValueProvince, setSelectedValueProvince] = useState("1");
  const [selectedValueDistrict, setSelectedValueDistrict] = useState("");
  const [selectedValueStreet, setSelectedValueStreet] = useState("");
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [usergender, setUsergender] = useState('')
  const [userDOB, setUserDOB] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const getUserInfo = await Api.get(`/user/${loggedInUserID}`);
      setLoggedInUserData(getUserInfo.data.finduser);
    } catch (error) {
      console.log(error);
    }
  };
  //loggedinuserID
  const loggedID = loggedInUserData._id;

  //upload profile info

  const handleUserName =(e) =>{
    setUserName(e.target.value )

  }
  const handleUserEmail =(e) =>{
    setUserEmail(e.target.value)
    
  }  
  const handleUserNumber =(e) =>{
    setUserNumber(e.target.value)
  }

  const handleGender =(e)=>{
    setUsergender(e.target.value)
  }
const handleDate =(e)=>{
  setUserDOB(e.target.value)
}
  const handleSelect = (e) => {
    setSelectedValueProvince(e.target.value);
  };

  const handleImage = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const handleSelectDistrict = (e) => {
    setSelectedValueDistrict(e.target.value);
  };
  const handleChangeStreet = (e) => {
    setSelectedValueStreet(e.target.value);
  };

  const handleSubmit = async (e) => {

    const formData = new FormData();

//  if(userEmail || userEmail || userNumber || usergender || userDOB || selectedValueProvince || selectedValueDistrict || selectedValueStreet || profileImg == null){
//   return message.error("Form fields cannot be empty")
//  }
//  else{

    formData.append("userName",userName);
    formData.append("userEmail",userEmail);
    formData.append("userNumber",userNumber);
    formData.append("usergender",usergender);
    formData.append("userDOB",userDOB);
    formData.append("selectedValueProvince", selectedValueProvince);
    formData.append("selectedValueDistrict", selectedValueDistrict);
    formData.append("selectedValueStreet", selectedValueStreet);
    formData.append("profileImg", profileImg);
    formData.append("loggedInUserID", loggedInUserID);

    try {
      //headers is mosttttt important to include
      const sendProfileDataImg = await Api.post("/userMoreInfo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(sendProfileDataImg);
      message.success(sendProfileDataImg.data.Message);
      fetchUserExtraInfo();
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  //for addition info
  const fetchUserExtraInfo = async () => {
    try {
      const getUserExtraInfo = await Api.get(
        `/userExtraInfo/${loggedInUserID}`
      );
      setLoggedInUserExtraData(getUserExtraInfo.data.finduserExtraData);
      setHomeData(getUserExtraInfo.data);
    } catch (error) {
      setIsSubmitted(true);
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserExtraInfo();
  }, []);

  return (
    <>
      {/* <Navbar loggedInUserExtraData={loggedInUserExtraData} /> */}
      {loggedInUserExtraData.length !== 0 &&(
   <div className="welcomeScreen">
   <div className="profileImg">
     <img
       src={`http://localhost:8001${loggedInUserExtraData.profileImg}`}
       style={{
         width: "200px",
         height: "200px",
         borderRadius: "50%",
         border: "solid #F13C20",
         objectFit:"cover",
       }}
       alt="img"
     />
   </div>
   <div className="personalDetails">
     <h3>Welcome, {loggedInUserExtraData.userName}!</h3>
     <h5>
       <MailOutlined className="customIcons" />
       {loggedInUserExtraData.userEmail}
     </h5>
     <h5>
       <PhoneOutlined className="customIcons" />
       {loggedInUserExtraData.userNumber}
     </h5>
     <div className="address">
       <h5>
         <PushpinOutlined className="customIcons" />
         Province {loggedInUserExtraData.selectedValueProvince}, {}{" "}
       </h5>
       <h5> {loggedInUserExtraData.selectedValueDistrict}</h5>
       <h5>,{loggedInUserExtraData.selectedValueStreet}</h5>
     </div>
   </div>
 </div>
      )}
   

      {isSubmitted === true && (
        <>
          <Modal
            title={loggedInUserData.username + " " + "Information"}
            centered
            maskClosable={false}
            // closable={false}
            open={modalOpen}
            onOk={() => handleSubmit()}
            onCancel={() => setModalOpen(false)}
            okText="Submit"
            cancelText="Cancle"
            className="antModel"
          >
            <form
              className="customForm"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <h4 className="hr-lines">Personal Information</h4>
              <fieldset>
                <legend>Your Name</legend>
                <input
                  className="customFormItem"
                  onChange={handleUserName}
                  type="text"
                  placeholder={loggedInUserData.username}
                  name="text"
                  required
                />
              </fieldset>
              <fieldset>
                <legend>Your Email</legend>
                <input
                  className="customFormItem"
                  onChange={handleUserEmail}
                  type="text"
                  placeholder={loggedInUserData.email}
                  name="email"
                  required
                />
              </fieldset>
              <fieldset>
                <legend>Your Number</legend>
                <input
                  className="customFormItem"
                  onChange={handleUserNumber}
                  type="number"
                  placeholder={loggedInUserData.mobilenumber}
                  name="mobilenumber"
                  required
                />
              </fieldset>
              <fieldset>
                <legend>Select Gender</legend>
                <select name="gender" 
                  className="customFormItem"
                  onChange={handleGender}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </fieldset>
              <fieldset>
                <legend>Date Of Birth</legend>
                <input type="date"
                className="customFormItem"

            onChange={handleDate}
                />
              </fieldset>
              <fieldset>
                <legend>Select Province</legend>
                <select
                  name="province"
                  className="customFormItem"
                  onChange={handleSelect}
                  required
                >
                  {province?.map((pData, index) => (
                    <option key={index} value={pData.label}>
                      {pData.value}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset>
                <legend>Select District</legend>
                <select
                  name="province"
                  className="customFormItem"
                  onChange={handleSelectDistrict}
                >
                  {districts
                    ?.filter(
                      (selectedProvince) =>
                        selectedProvince.province_id === selectedValueProvince
                    )
                    .map((dData, index) => (
                      <option key={index} value={dData.name}>
                        {dData.name}
                      </option>
                    ))}
                </select>
              </fieldset>
              <fieldset>
                <legend>City/Village</legend>
                <input
                  className="customFormItem"
                  onChange={handleChangeStreet}
                  type="text"
                  placeholder="Eg: Kathmandu"
                  name="street"
                  required
                />
              </fieldset>

              <fieldset>
                <legend>Your Profile</legend>
                <input
                  className="customFormItemImg"
                  type="file"
                  onChange={handleImage}
                  id="img"
                  name="profileImg"
                  required
                />
              </fieldset>
            </form>
          </Modal>
        </>
      )}
      {loggedInUserExtraData.length !== 0 &&(
      <UserInfoSideBar loggedInUserExtraData={loggedInUserExtraData}/>
      )}
    </>
  );
};

export default Profile;
