import React, { useState } from "react";
import "./PostJobs.css";
import { Modal, Tag, message } from "antd";
import { province, districts } from "../ExternalData/Nepal";
import Api from "../utills/Api";

const PostJobs = ({ loggedInCompanyExtraData,companyIDBackend,companyNameBackend }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false)
  const [jobsData, setJobsData] = useState({
    companyName: "",
    vacancyNumber: "",
    jobSalary: "",
    jobExperience: "",
    myTextarea:"",
  });
  const [skills, setSkills] = useState([]); // State to store the skills
  const [keyskills, setKeyskills] = useState([]); // State to store the skills

  const [selectedValueProvince, setSelectedValueProvince] = useState("1");
  const [selectedValueDistrict, setSelectedValueDistrict] = useState("");
  const [selectedValueStreet, setSelectedValueStreet] = useState("");
  const [selectedValueQualification, setSelectedValueQualification] = useState([]);

  const [qualificationField, setQualificationField] = useState(""); // State to store the input value
  const [keySkillsField, setKeySkillsField] = useState(""); // State to store the input value

  const [counter, setCounter] = useState(250);

  const loggedInUser = JSON.parse(
    window.localStorage.getItem("jobeznepalUser")
  );
  let loggedInUserID = loggedInUser.doUserExist._id;

  const generateId = () => {
    const id = counter + 1;
    setCounter(id);
    return id;
  };
  const handlequalificationFieldchange = (e) => {
    setQualificationField(e.target.value);
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

  //key skills--------------------------------------------------------------
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

  const handleCompanyChange = (e) => {
    console.log(e.target.value);
    setJobsData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    let jsonSkills = JSON.stringify(skills);
    let jsonKeyskills = JSON.stringify(keyskills);
    let jsonjobsData = JSON.stringify(jobsData);

    if (
        jobsData === '' ||
        selectedValueProvince.trim() === '' ||
        selectedValueStreet.trim() === '' ||
        selectedValueDistrict.trim() === '' ||
        loggedInUserID.trim() === '' ||
        keyskills ===''

      ) {
        setError("All fields are required");
        return;
      }
    const formData = new FormData();
    formData.append("jobsData",jsonjobsData);
    formData.append("selectedValueProvince", selectedValueProvince);
    formData.append("selectedValueDistrict", selectedValueDistrict);
    formData.append("selectedValueStreet", selectedValueStreet);
    formData.append("selectedValueQualification",selectedValueQualification)
    formData.append("loggedInUserID", loggedInUserID);
    formData.append("Skills",jsonSkills)
    formData.append("Keyskills",jsonKeyskills)
    formData.append("companyName",companyNameBackend)
    formData.append("companyId",companyIDBackend)
    
    try {
        const addJobs = await Api.post("/addJobs",formData)
      message.success(addJobs.data.Message);
      setShowForm(false);
    } catch (error) {
        console.log(error)
      message.error(error.response.data);
    }
  };

  return (
    <>
      <div className="buttonPostJObs">
        <button className="jobsButton" style={{marginBottom:"20px"}} onClick={()=>setShowForm(true)}>Post Jobs +</button>
      </div>
      {showForm ? (
        <div className="postJObForm">

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
              <legend>City/Village*</legend>
              <input
                className="street"
                onChange={handleChangeStreet}
                type="text"
                placeholder="Eg: Kathmandu"
                name="street"
                required
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
                  name="training"
                />
              </fieldset>
            </div>
          </div>
        </fieldset>
        {skills.length > 0 && (
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
            {keyskills.length > 0 && (
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
                <textarea id="myTextarea" name="myTextarea" rows="6" cols="75" onChange={handleCompanyChange} placeholder="Describe the job requirements, skills, and responsibilities..."></textarea>
            </fieldset>
        </div>
        <button type="submit"  className="jobsButton" style={{marginBottom:"10px"}}>Submit </button>
      </form>
      </div> 

      ):(
        <></>
      )}
    </>
  );
};

export default PostJobs;
