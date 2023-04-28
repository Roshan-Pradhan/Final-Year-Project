import { Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import "./Skills.css";
import Api from "../utills/Api";

const Skills = () => {
  const loggedInUser = JSON.parse(
    window.localStorage.getItem("jobeznepalUser")
  );
  let loggedInUserID = loggedInUser.doUserExist._id;
  
  const [skills, setSkills] = useState([]); // State to store the skills
  //forsending to backend
  const [training, setTraining] = useState([]);
  const [employee, setEmployee] = useState([]);

  const [inputValue, setInputValue] = useState(""); // State to store the input value
  const [inputValueTraining, setInputValueTraining] = useState(""); // State to store the input value
  const [inputValueEmployee, setInputValueEmployee] = useState(""); // State to store the input value

  const [counter, setCounter] = useState(250);
  const [resumeDataSkills, setResumeDataSkills] = useState([]);
  const [resumeDataTraining, setResumeDataTraining] = useState([]);
  const [resumeDataEmployee, setResumeDataEmployee] = useState([]);

  const generateId = () => {
    const id = counter + 1;
    setCounter(id);
    return id;
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handler for adding a skill
  const handleAddSkill = () => {
    const id = generateId();
    if (inputValue.trim() !== "") {
      const skill = {
        id: id,
        name: inputValue.trim(),
      };
      setSkills([...skills, skill]); // Add the input value to the skills array
      setInputValue(""); // Clear the input value
    }
  };

  // Handler for pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" ||  e.key === ",") {
      e.preventDefault(); // Prevent form submission
      handleAddSkill(); // Call the handleAddSkill function
    }
  };
  const handleOnClose = (id) => {
    const newData = skills.filter((skill) => skill.id !== id);
    setSkills(newData);
  };

  // Handler for input change
  const handleInputChangeTraining = (e) => {
    setInputValueTraining(e.target.value);
  };

  // Handler for adding a training
  const handleAddSkillTraining = () => {
    const id = generateId();
    if (inputValueTraining.trim() !== "") {
      const train = {
        id: id,
        name: inputValueTraining.trim(),
      };
      setTraining([...training, train]); // Add the input value to the skills array
      setInputValueTraining(""); // Clear the input value
    }
  };

  // Handler for pressing Enter key
  const handleKeyPressTraining = (e) => {
    if (e.key === "Enter" ||  e.key === ",") {
      e.preventDefault(); // Prevent form submission
      handleAddSkillTraining(); // Call the handleAddSkill function
    }
  };
  const handleOnCloseTraining = (id) => {
    const newDataTraining = training.filter((train) => train.id !== id);
    setTraining(newDataTraining);
  };

  // Handler for input change employee
  const handleInputChangeEmployee = (e) => {
    setInputValueEmployee(e.target.value);
  };

  // Handler for adding a employee
  const handleAddSkillEmployee = () => {
    const id = generateId();
    if (inputValueEmployee.trim() !== "") {
      const employement = {
        id: id,
        name: inputValueEmployee.trim(),
      };
      setEmployee([...employee, employement]); // Add the input value to the skills array
      setInputValueEmployee(""); // Clear the input value
    }
  };

  // Handler for pressing Enter key
  const handleKeyPressEmployee = (e) => {
    if (e.key === "Enter" ||  e.key === ",") {
      e.preventDefault(); // Prevent form submission
      handleAddSkillEmployee(); // Call the handleAddSkill function
    }
  };
  const handleOnCloseEmployee = (id) => {
    const newDataTraining = employee.filter((employee) => employee.id !== id);
    setEmployee(newDataTraining);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let jsonSkills = JSON.stringify(skills);
    let jsonTraining = JSON.stringify(training);
    let jsonEmploye = JSON.stringify(employee);
    const formData = new FormData();
    formData.append("skills", jsonSkills);
    formData.append("training", jsonTraining);
    formData.append("employee", jsonEmploye);
    formData.append("loggedInUserID", loggedInUserID);

    try {
      const sendSkillsInfo = await Api.post("/userResume", formData);
      message.success(sendSkillsInfo.data.Message);
      getResumeDetails();
    } catch (error) {
      console.log(error);
      message.error(error.response.data);
    }
  };

  const getResumeDetails = async () => {
    try {
      const getResumeData = await Api.get(`userResumeData/${loggedInUserID}`);
      setResumeDataSkills(JSON.parse(getResumeData.data.finduserResume.skills));
      setResumeDataTraining(
        JSON.parse(getResumeData.data.finduserResume.training)
      );
      setResumeDataEmployee(
        JSON.parse(getResumeData.data.finduserResume.employee)
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResumeDetails();
  }, []);
console.log(resumeDataSkills)
  return (
    <>
      {!resumeDataSkills.length > 0 || !resumeDataTraining.length > 0 ? (
        <form className="skillsForm" onSubmit={handleSubmit}>
          <div className="formItem">
            <fieldset>
              <p className="information">
                Enter your skills details then press enter or space or comma for
                adding another.
                <br />
                <span className="exInfo"> Ex: HTML,CSS,React....</span>
              </p>
              <legend>Key Skills</legend>
              <input
                className="skillsInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Enter a skill and press Enter or Space or Comma"
                style={{ width: "100%" }}
                name="skills"
              />
            </fieldset>
            {skills.length > 0 && (
              <div className="mapSkills">
                {skills?.map((item) => (
                  <div key={item.id}>
                    <Tag
                      className="customTag"
                      closable
                      onClose={() => handleOnClose(item.id)}
                    >
                      {item.name}
                    </Tag>
                  </div>
                ))}
              </div>
            )}
            <fieldset>
              <p className="information">
                Enter your training details then press enter or space or comma
                for adding another.
                <br />
                <span className="exInfo">
                  {" "}
                  Ex: 3 months training on web development...{" "}
                </span>
              </p>
              <legend>Training Details</legend>
              <input
                className="skillsInput"
                type="text"
                value={inputValueTraining}
                onChange={handleInputChangeTraining}
                onKeyDown={handleKeyPressTraining}
                placeholder="Enter a training and press Enter or Space or Comma "
                style={{ width: "100%" }}
                name="training"
              />
            </fieldset>
            {training.length > 0 && (
              <div className="mapSkills">
                {training.map((item) => (
                  <div key={item.id}>
                    <Tag
                      className="customTag"
                      closable
                      onClose={() => handleOnCloseTraining(item.id)}
                    >
                      {item.name}
                    </Tag>
                  </div>
                ))}
              </div>
            )}
            <fieldset>
              <p className="information">
                Enter your employee details then press enter or space or comma
                for adding another.
                <br />
                <span className="exInfo">
                  {" "}
                  Ex: worked as xyz at xyz company for xyz time...{" "}
                </span>
              </p>
              <legend>Employment Details</legend>
              <input
                className="skillsInput"
                type="text"
                value={inputValueEmployee}
                onChange={handleInputChangeEmployee}
                onKeyDown={handleKeyPressEmployee}
                placeholder="Enter a training and press Enter or Space or Comma "
                style={{ width: "100%" }}
                name="training"
              />
            </fieldset>
            {employee.length > 0 && (
              <div className="mapSkills">
                {employee.map((item) => (
                  <div key={item.id}>
                    <Tag
                      className="customTag"
                      closable
                      onClose={() => handleOnCloseEmployee(item.id)}
                    >
                      {item.name}
                    </Tag>
                  </div>
                ))}
              </div>
            )}
          </div>
          <br />
          <button
            type="submit"
            style={{
              marginTop: "50px",
              marginLeft: "80px",
              background: "#F13C20",
              color: "white",
              padding: "4px 15px ",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent:"space-between",
            margin: "0px 75px",
          }}
        >
          <div className="parseSkill">
            <h4>Key Skills</h4>
            {resumeDataSkills.map((item) => (
              <div className="subSkill" key={item.id}>
                <li>{item.name}</li>
              </div>
            ))}
          </div>
          <div className="parseSkill">
            <h4>Training Details</h4>
            {resumeDataTraining.map((item) => (
              <div className="subSkill" key={item.id}>
                <li>{item.name}</li>
              </div>
            ))}
          </div>
          <div className="parseSkill">
            <h4>Employement Details</h4>
            {resumeDataEmployee.map((item) => (
              <div className="subSkill" key={item.id}>
                <li>{item.name}</li>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Skills;
