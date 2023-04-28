import React, { useEffect, useState } from "react";
import Api from "../utills/Api";
import "./CompanyJobPage.css";
import {
  DeleteOutlined,
  DeploymentUnitOutlined,
  DollarCircleOutlined,
  EditOutlined,
  FieldTimeOutlined,
  PushpinOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link,useNavigate } from "react-router-dom";
import { Modal, Tag, message } from "antd";
import { province, districts } from "../ExternalData/Nepal";

const CompanyJobPage = ({ companyInfo }) => {
  const navigate = useNavigate();

  const [companyPostedJobs, setcompanyPostedJobs] = useState([]);
  const [postedJobWithID, setPostedJobWithID] = useState([])
  const [jobID, setJobID] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modelOpen2, setmodelOpen2] = useState(false)
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(250);
  const [qualificationField, setQualificationField] = useState(""); // State to store the input value
 
  



  let loggedInUserID;

  if (companyInfo) {
    loggedInUserID = companyInfo.loggedInUserID;
  }
  const postedJobs = async () => {
    try {
      const getPostedJobs = await Api.get(`/getPostedJobs/${loggedInUserID}`);
      setcompanyPostedJobs(getPostedJobs.data.findPostedJobs);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTitleClick =(jobID)=>{
    setJobID(jobID);
    
    navigate(`/singleJobPage/${jobID}`);
  }
 
  
  const handleEditClick = (jobID)=>{
  setModalOpen(true)
  const filterJobwithID = companyPostedJobs.filter((jobs)=>jobs._id===jobID);
    setPostedJobWithID(filterJobwithID)
  }
  
//---------------destructuringDatas--------------------
// Parse the JSON-encoded strings and access individual properties
const singlejobData =
postedJobWithID[0]?.jobsData && postedJobWithID[0].jobsData.length > 0
  ? JSON.parse(postedJobWithID[0]?.jobsData[0])
  : {};
const singlekeySkills =
postedJobWithID[0]?.Keyskills && postedJobWithID[0]?.Keyskills.length > 0
  ? JSON.parse(postedJobWithID[0]?.Keyskills[0])
  : [];
const singleskills =
postedJobWithID[0]?.Skills && postedJobWithID[0]?.Skills.length > 0
  ? JSON.parse(postedJobWithID[0]?.Skills[0])
  : [];
const singlequalification =
postedJobWithID[0]?.selectedValueQualification &&
postedJobWithID[0]?.selectedValueQualification.length > 0
  ? postedJobWithID[0]?.selectedValueQualification[0]?.split(",")
  : [];
  const [keySkillsField, setKeySkillsField] = useState(""); // State to store the input value
  const [skills, setSkills] = useState([]); // State to store the skills
  const [keyskills, setKeyskills] = useState([]); // State to store the skills
  const [selectedValueProvince, setSelectedValueProvince] = useState("");
  const [selectedValueDistrict, setSelectedValueDistrict] = useState("");
  const [selectedValueStreet, setSelectedValueStreet] = useState("");

  useEffect(()=>{
  if(postedJobWithID[0]){
    setSkills(JSON.parse(postedJobWithID[0]?.Skills[0]))
    setKeyskills(JSON.parse(postedJobWithID[0]?.Keyskills[0]))
  }
},[postedJobWithID[0]?.Skills[0],postedJobWithID[0]?.Keyskills[0]])

useEffect(()=>{
  if(postedJobWithID[0]){
    setSelectedValueProvince(postedJobWithID[0]?.selectedValueProvince)
    setSelectedValueDistrict(postedJobWithID[0]?.selectedValueDistrict)
    setSelectedValueStreet(postedJobWithID[0]?.selectedValueStreet)
  }
},[postedJobWithID[0]?.selectedValueProvince,postedJobWithID[0]?.selectedValueDistrict,postedJobWithID[0]?.selectedValueStreet])


const generateId = () => {
  const id = counter + 1;
  setCounter(id);
  return id;
};
const handlequalificationFieldchange = (e) => {
  setQualificationField(e.target.value);
  console.log(handlequalificationFieldchange)

};

const handleAddSkill = () => {
  const id = generateId();
  if (qualificationField.trim() !== "") {
    const skill = {
      id: id,
      name: qualificationField.trim(),
    };
    setSkills([...skills, skill]); // Add the input value to the skills array
    setQualificationField(""); // Clear the input value
  }
};

// Handler for pressing Enter key
const handleKeyPressQualification = (e) => {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault(); // Prevent form submission
    handleAddSkill(); // Call the handleAddSkill function
  }
};
const handleOnCloseQualification = (id) => {
  const newData = skills.filter((skill) => skill.id !== id);
  setSkills(newData);
};
const [selectedValueQualification, setSelectedValueQualification] = useState([]);

const handlequalificationKeySkillschange = (e) => {
  setKeySkillsField(e.target.value);
};

const handleAddKeySkill = () => {
  const id = generateId();
  if (keySkillsField.trim() !== "") {
    const skill = {
      id: id,
      name: keySkillsField.trim(),
    };
    setKeyskills([...keyskills, skill]); // Add the input value to the skills array
    setKeySkillsField(""); // Clear the input value
  }
};

// Handler for pressing Enter key
const handleKeyPressSkills = (e) => {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault(); // Prevent form submission
    handleAddKeySkill(); // Call the handleAddSkill function
  }
};
const handleOnCloseSkills = (id) => {
  const newData = keyskills.filter((skill) => skill.id !== id);
  setKeyskills(newData);
};

const handleSelectProvince = (e) => {
  setSelectedValueProvince(e.target.value);
};

const handleSelectDistrict = (e) => {
  setSelectedValueDistrict(e.target.value);
};
const handleChangeStreet = (e) => {
  setSelectedValueStreet(e.target.value);
};

const handleQualificationSelection =(e)=>{
  const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
  // Update state with selected options
  setSelectedValueQualification(selectedOptions);

}
const [jobsData, setJobsData] = useState({});

  useEffect(() => {
    if (singlejobData) {
      setJobsData({
        companyName: singlejobData?.companyName,
        vacancyNumber: singlejobData?.vacancyNumber,
        jobSalary: singlejobData?.jobSalary,
        jobExperience: singlejobData?.jobExperience,
        myTextarea: singlejobData?.myTextarea,
      });
    }
  }, [singlejobData?.companyName, singlejobData?.vacancyNumber, singlejobData?.jobSalary, singlejobData?.jobExperience, singlejobData?.myTextarea]);

  const handleCompanyChange = (e) => {
    setJobsData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(jobsData)

const handleDeletejobs = async(jobID)=>{
setmodelOpen2(true)
try {
  const deleteJobs = await Api.delete(`/deleteSinglejob/${jobID}`)
message.success(deleteJobs.data.Mesaage);
postedJobs()

} catch (error) {
  console.log(error)
}
}

const handleSubmit = async (e) => {
  let jsonSkills = JSON.stringify(skills);
  let jsonKeyskills = JSON.stringify(keyskills);
  let jsonjobsData = JSON.stringify(jobsData);
  
  if (
    jobsData === '' ||
    selectedValueProvince === '' ||
    selectedValueStreet === '' ||
    selectedValueDistrict === '' ||
    jsonKeyskills.length === 0 ||
    jsonSkills.length === 0
  ) {
    setError("All fields are required");
    return;
  }
const formData = new FormData();
formData.append("selectedjobID",postedJobWithID[0]?._id)
formData.append("jobsData",jsonjobsData);
formData.append("selectedValueProvince", selectedValueProvince);
formData.append("selectedValueDistrict", selectedValueDistrict);
formData.append("selectedValueStreet", selectedValueStreet);
formData.append("selectedValueQualification",selectedValueQualification)
formData.append("Skills",jsonSkills)
formData.append("Keyskills",jsonKeyskills)

try {
    const editJobs = await Api.put("/editSinglejob",formData)
  message.success(editJobs.data.Mesaage);
  setModalOpen(false)
  postedJobs()
} catch (error) {
    console.log(error)
  message.error(error.response.data);
}
}


  useEffect(() => {
    if (companyInfo) {
      postedJobs();
    }
  }, [companyInfo]);

  return (
    <>
      <div className="postedJobsDetails">
        {companyPostedJobs.map((item, index) => (
          <div className="singleJobDetails" key={index}>
            {/* -------------------------------- jobsData----------------------------------------- */}
            {item.jobsData.map((jobsDataItem, index) => {
              const validjobData = JSON.parse(jobsDataItem);
              return (
                <div key={index} >
                  <div className="titleBtn">
                <h1 className="MainTitle" onClick={()=>handleTitleClick(item._id)}>{validjobData.companyName}</h1>
                <div className="titlebtns">
                <button onClick={()=>handleEditClick(item._id)}><EditOutlined /></button>
                <button onClick={()=>handleDeletejobs(item._id)}><DeleteOutlined /></button>
                </div>
                </div>
                  <div className="jobaddress">
                    <h5 className="subTitle">
                      <UsergroupAddOutlined className="customIcons" />
                    </h5>
                    <h5 className="subTitle">Vacancy: &nbsp;</h5>
                    <h5 className="mainText">{validjobData.vacancyNumber}</h5>
                  </div>
                  <div className="jobaddress">
                    <h5 className="subTitle">
                      <DollarCircleOutlined className="customIcons" />
                    </h5>
                    <h5 className="subTitle">Offered Salary: &nbsp;</h5>
                    <h5 className="mainText">
                      {validjobData.jobSalary !== "" ? (
                    <h5 className="mainText"> {validjobData.jobSalary}</h5>
                      ):
                      (
                    <h5 className="mainText">Negotiable

                    </h5>
                      ) }
                      
                      </h5>
                  </div>
                </div>
              );
            })}
            {/* ------------------------------------------------------------------------------------------- */}
            <div className="jobaddress">
              <h5 className="subTitle">
                <PushpinOutlined className="customIcons" />
              </h5>
              <h5 className="subTitle">Location: &nbsp;</h5>
              <h5 className="mainText">
                Province {item.selectedValueProvince}, &nbsp;
              </h5>
              <h5 className="mainText">
                {" "}
                {item.selectedValueDistrict}, &nbsp;{" "}
              </h5>
              <h5 className="mainText">{item.selectedValueStreet}</h5>
            </div>
            {item.Keyskills.map((KeyskillsItem, index) => {
              const validKeyskills = JSON.parse(KeyskillsItem);
              return (
                <div key={index}>
                  <div className="jobaddress">
                    <h5 className="subTitle">
                      <DeploymentUnitOutlined  className="customIcons" />
                    </h5>
                    <h5 className="subTitle">Key Skills: &nbsp;</h5>
                    <div className="keySkillsRequired">
                    {validKeyskills.map((difSkills,index) => {
                      return(
                        <div className="diffSkilss" key={index}>
                        <h5 className="mainText">{difSkills.name}</h5>
                        </div>
                      )
                      })}
                      </div>
                  </div>
                </div>
              );
            })}
            <div className="jobaddress">
                    <h5 className="subTitle">
                      <FieldTimeOutlined className="customIcons" />
                    </h5>
                    <h5 className="subTitle">Posted On: &nbsp;</h5>
                    <h5 className="mainText">{new Date(item.createdAt).toISOString().slice(0, 10)}</h5>
                  </div>

          </div>
        ))}
      </div>
    
      <Modal 
      title="Edit Job Details"
      centered
      maskClosable={false}
      open={modalOpen}
      onOk={() => handleSubmit()}
      onCancel={() => setModalOpen(false)}
      okText="Submit"
      cancelText="Cancle"
      className="antModelJobEdit"
      >
      <form
        className="jobsForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
         
        {error && <p style={{ color: "red", fontSize: "15px" }}>{error}*</p>}
        <fieldset className="customFieldset">
        <legend className="legendTitle">Job Information</legend>
        <div className="titleNumber">
          <fieldset>
            <legend>Job Title*</legend>
            <input
              className="jobsFormItem"
              onChange={handleCompanyChange}
              type="text"
              placeholder="Ex-Customer Service Representative "
              name="companyName"
              required
              defaultValue={singlejobData.companyName}
            />
          </fieldset>
          <fieldset>
            <legend>Number Of Vacancy*</legend>
            <input
              className="jobsFormItem"
              onChange={handleCompanyChange}
              type="Number"
              placeholder="Ex-5  "
              name="vacancyNumber"
              defaultValue={singlejobData.vacancyNumber}

              required
            />
          </fieldset>
        </div>
        <br />
        <div className="salaryXperience">
          <fieldset>
            <legend>Offered Salary</legend>
            <input
              className="jobsFormItem"
              onChange={handleCompanyChange}
              type="number"
              placeholder="Ex-20000-30000"
              name="jobSalary"
              defaultValue={singlejobData.jobSalary}

            />
          </fieldset>
          <fieldset>
            <legend>Years of Experience</legend>
            <input
              className="jobsFormItem"
              onChange={handleCompanyChange}
              type="Number"
              placeholder="Ex-2"
              name="jobExperience"
              defaultValue={singlejobData.jobExperience}

            />
          </fieldset>
        </div>
        </fieldset>
        <br />
        <fieldset className="customFieldset">
          <legend className="legendTitle">Job Location</legend>
          <div className="jobsLocation">
            <fieldset>
              <legend>Select Province*</legend>
              <select
                name="province"
                className="customFormItem"
                onChange={handleSelectProvince}
                required
                defaultValue={postedJobWithID[0]?.selectedValueProvince}
              >
                {province?.map((pData, index) => (
                  <option key={index} value={pData.label}>
                    {pData.value}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset>
              <legend>Select District*</legend>
              <select
                name="district"
                className="customFormItem"
                onChange={handleSelectDistrict}
                defaultValue={postedJobWithID[0]?.selectedValueDistrict}

              >
                {districts
                  ?.filter(
                    (selectedProvince) =>
                      selectedProvince.province_id === postedJobWithID[0]?.selectedValueProvince
                  )
                  .map((dData, index) => (
                    <option key={index} value={dData.name}>
                      {dData.name}
                    </option>
                  ))}
              </select>
            </fieldset>
            <fieldset>
              <legend>City/Village*</legend>
              <input
                className="street"
                onChange={handleChangeStreet}
                type="text"
                placeholder="Eg: Kathmandu"
                name="street"
                required
                defaultValue={postedJobWithID[0]?.selectedValueStreet}

              />
            </fieldset>
          </div>
        </fieldset>
        <br />
        <fieldset className="customFieldset">
        <legend className="legendTitle">Applicants Qualification</legend>

          <div className="jobsSpecification">
            <fieldset className="customFieldset">
              <legend>Qualification Required</legend>
              <p className="jobinformation">
                  Select Multiple qualification required for applicants
                  </p>
              <select
                name="qualification"
                className="jobsFormItemSelect"
                onChange={handleQualificationSelection}
                multiple
              
              >
                <option value="slc/see">SLC/SEE</option>
                <option value="10+2">10+2</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="None">None</option>
              </select>
            </fieldset>
            <div className="jobField">
              <fieldset className="customFieldset">
                <legend>Qualification Field</legend>
                <p className="jobinformation">
                  Enter qualification field required for applicants then press
                  enter or comma for adding another.
                  <br />
                  <span className="exInfo">
                    Ex: Science, Commerce, BBS, BBA, BE, BCA..
                  </span>
                </p>
                <input
                  className="jobqualificationfieldInput"
                  type="text"
                  value={qualificationField}
                  onChange={handlequalificationFieldchange}
                  onKeyDown={handleKeyPressQualification}
                  placeholder="Enter a details and press Enter or Space or Comma "
                  style={{ width: "100%" }}
                  name="field"
                />
              </fieldset>
            </div>
          </div>
        </fieldset>
  {skills.length > 0 &&  (
  <div
    className=""
    style={{
      display: "flex",
      flexWrap:"wrap",
      marginLeft:"50%"
    }}
  >
    {skills.map((item) => (
      <div key={item.id}>
        <Tag
          className="customTag"
          closable
          onClose={() => handleOnCloseQualification(item.id)}
        >
          {item.name}
        </Tag>
      </div>
    ))}
  </div>
)}
       
        <br />
        <fieldset className="customFieldset">
        <legend className="legendTitle">Applicants Key Skills</legend>
        <div className="jobField">
              <fieldset className="customFieldset">
                <legend>Key Skills*</legend>
                <p className="jobinformation">
                Please mention relevant skills and expertise required for a applicants...
                Please Press enter or comma for adding another.
                  <br />
                  <span className="exInfo">
                    Ex: MS Word, HTML, CSS, EXCEL....
                  </span>
                </p>
                <input
                  className="jobsFormItem"
                  type="text"
                  value={keySkillsField}
                  onChange={handlequalificationKeySkillschange}
                  onKeyDown={handleKeyPressSkills}
                  placeholder="Enter a details and press Enter or Space or Comma "
                  style={{ width: "100%" }}
                  name="keyskills"
                 
                />
              </fieldset>
            </div>
            </fieldset>
            <br />
            {keyskills.length > 0 &&  (
          <div
            className=""
            style={{
              display: "flex",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            {keyskills.map((item) => (
              <div key={item.id}>
                <Tag
                  className="customTag"
                  closable
                  onClose={() => handleOnCloseSkills(item.id)}
                >
                  {item.name}
                </Tag>
              </div>
            ))}
          </div>
        )}
        <div className="jobDescription">
            <fieldset className="jobDescriptionfieldset">
                <legend>Job Description</legend>
                <textarea id="myTextarea" name="myTextarea" rows="6" cols="75"  onChange={handleCompanyChange} 
                defaultValue={singlejobData?.myTextarea}
                
                ></textarea>
            </fieldset>
        </div>
        <button type="submit"  className="jobsButton" style={{marginBottom:"10px"}}>Submit </button>
      </form>
      </Modal>

<Modal
 title="Are you sure you want to delete?"
 centered
 maskClosable={false}
 open={modelOpen2}
 onOk={() => handleDeletejobs()}
 onCancel={() => setmodelOpen2(false)}
 okText="Delete"
 cancelText="Cancle"
>
</Modal>


    </>
  );
};

export default CompanyJobPage;
