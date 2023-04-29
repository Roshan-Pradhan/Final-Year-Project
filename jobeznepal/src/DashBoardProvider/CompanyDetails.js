import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";
import Api from"../utills/Api"
import "../DashBoard/Profile.css"
import { province, districts } from "../ExternalData/Nepal";
import {
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import CompanyPage from "./CompanyPage";
import PostJobs from "./PostJobs";

const CompanyDetails = ({ setHomeData,setCompanyInfo }) => {

  const loggedInUser = JSON.parse(
    window.localStorage.getItem("jobeznepalUser")
  );
  let loggedInUserID = loggedInUser.doUserExist._id;

  const [loggedInUserData, setLoggedInUserData] = useState([]);
  const [loggedInCompanyExtraData, setLoggedInCompanyExtraData] = useState([]);
  const [profileImg, setProfileImg] = useState("");
  const [selectedValueProvince, setSelectedValueProvince] = useState("1");
  const [selectedValueDistrict, setSelectedValueDistrict] = useState("");
  const [selectedValueStreet, setSelectedValueStreet] = useState("");
  const [companyName,  setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyNumber,setCompanyNumber] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
const [error, setError] = useState('')

  //loggedinuserID
  const loggedID = loggedInUserData._id;

  //upload profile info

  const handleCompanyName =(e) =>{
    setCompanyName(e.target.value )

  }
  const handleCompanyEmail =(e) =>{
    setCompanyEmail(e.target.value)
    
  }  
  const handleCompanyNumber =(e) =>{
    setCompanyNumber(e.target.value)
  }

  const handleCompanyType =(e)=>{
    setCompanyType(e.target.value)
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

    if (
        companyName.trim() === '' ||
        companyEmail.trim() === '' ||
        companyNumber.trim() === '' ||
        companyType.trim() === '' ||
        selectedValueProvince.trim() === '' ||
        selectedValueStreet.trim() === '' ||
        selectedValueDistrict.trim() === '' ||
        !profileImg ||
        loggedInUserID.trim() === ''
      ) {
        setError("All fields are required");
        return;
      }

    const formData = new FormData();
    formData.append("companyName",  companyName);
    formData.append("companyEmail", companyEmail);
    formData.append("companyNumber",companyNumber);
    formData.append("companyType",companyType);
    formData.append("selectedValueProvince", selectedValueProvince);
    formData.append("selectedValueDistrict", selectedValueDistrict);
    formData.append("selectedValueStreet", selectedValueStreet);
    formData.append("profileImg", profileImg);
    formData.append("loggedInUserID", loggedInUserID);


    try {
      //headers is mosttttt important to include
      const sendProfileDataImg = await Api.post("/companyMoreInfo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success(sendProfileDataImg.data.Message);
      fetchCompanyExtraInfo();
      setModalOpen(false);

    } catch (error) {
      message.error(error.response.data);
      console.log(error);
    }
  };

  //for addition info
  const fetchCompanyExtraInfo = async () => {
    try {
      const getCompanyExtraInfo = await Api.get(
        `/companyExtraInfo/${loggedInUserID}`
      );
      setLoggedInCompanyExtraData(getCompanyExtraInfo.data.findCompanyExtraData);
      setCompanyInfo(getCompanyExtraInfo.data);
      setIsSubmitted(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchCompanyExtraInfo();
  }, [setCompanyInfo]);

  return (
    <>
      {loggedInCompanyExtraData.length !== 0 &&(
   <div className="welcomeScreen">
   <div className="profileImg">
     <img
       src={`http://localhost:8001${loggedInCompanyExtraData.profileImg}`}
       style={{
         width: "200px",
         height: "200px",
         borderRadius: "50%",
         border: "solid #F13C20",
       }}
       alt="img"
     />
   </div>
   <div className="personalDetails">
     <h3>Welcome, {loggedInCompanyExtraData.companyName}!</h3>
     <h5>
       <MailOutlined className="customIcons" />
       {loggedInCompanyExtraData.companyEmail}
     </h5>
     <h5>
       <PhoneOutlined className="customIcons" />
       {loggedInCompanyExtraData.companyNumber}
     </h5>
     <div className="address">
       <h5>
         <PushpinOutlined className="customIcons" />
         Province {loggedInCompanyExtraData.selectedValueProvince}, {}{" "}
       </h5>
       <h5> {loggedInCompanyExtraData.selectedValueDistrict}</h5>
       <h5>,{loggedInCompanyExtraData.selectedValueStreet}</h5>
     </div>
   </div>
 </div>
      )}
      {loggedInCompanyExtraData.length == 0 &&(

        <>
          <Modal
            title={"Provide Company Details"}
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
                {error&&
            <p style={{color:"red",fontSize:"15px"}}>{error}*</p>    
            }
              <h4 className="hr-lines">Company Information</h4>
              <fieldset>
                <legend>Company Name</legend>
                <input
                  className="customFormItem"
                  onChange={handleCompanyName}
                  type="text"
                  placeholder="Provide your company name"
                  name="text"
                  required
                />
              </fieldset>
              <fieldset>
                <legend>Company Email</legend>
                <input
                  className="customFormItem"
                  onChange={handleCompanyEmail}
                  type="text"
                  placeholder="Provide your company email"
                  name="email"
                  required
                />
              </fieldset>
              <fieldset>
                <legend>Company Number</legend>
                <input
                  className="customFormItem"
                  onChange={handleCompanyNumber}
                  type="number"
                  placeholder="Provide your company number"
                  name="mobilenumber"
                  required
                />
              </fieldset>
              <fieldset>
                <legend>Company Type</legend>
                <input
                  className="customFormItem"
                  onChange={handleCompanyType}
                  type="text"
                  placeholder="Ex-Banking,Software Service"
                  name="mobilenumber"
                  required
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

              <fieldset className="customFieldset">
                <legend>Company Logo/Image</legend>
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

{loggedInCompanyExtraData.length !==0 && 

     <CompanyPage loggedInCompanyExtraData={loggedInCompanyExtraData} />
}
    
    </>
  );
};

export default CompanyDetails;
