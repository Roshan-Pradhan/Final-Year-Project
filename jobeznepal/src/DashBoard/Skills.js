import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import "./Skills.css";

const Skills = () => {
  const [skills, setSkills] = useState([]); // State to store the skills
  const [inputValue, setInputValue] = useState(""); // State to store the input value

  // Handler for input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handler for adding a skill
  const handleAddSkill = () => {
    if (inputValue.trim() !== "") {
      setSkills([...skills, inputValue.trim()]); // Add the input value to the skills array
      setInputValue(""); // Clear the input value
    }
  };

  // Handler for pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleAddSkill(); // Call the handleAddSkill function
    }
  };
  const handleOnClose = (e) => {
    const newSkills = [...skills];
    console.log(newSkills)
    console.log(e)
   const removeSkills = newSkills.splice(e,1);
   console.log(removeSkills)
   setSkills([...newSkills]);
    console.log(newSkills)
};

  const handleSubmit = () => {
    console.log(skills);
  };
 
  return (
    <>
      <form className="skillsForm">
        <div
          className="formItem"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <fieldset>
            <p className="information">
              Enter your skills then press enter for adding another.
            </p>
            <legend>Key Skills</legend>
            <input
              className="skillsInput"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Enter a skill and press Enter"
              style={{ width: "100%" }}
            />
          </fieldset>
          {/* <fieldset>
            <p className="information">
              Enter your training details then press enter for adding another.
            </p>

            <legend>Training</legend>
            <input
              className="skillsInput"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Enter a training and press Enter "
              style={{ width: "100%" }}
            />
          </fieldset> */}
        </div>
        <br />
        <div
          style={{
            width: "550px",
            display: "flex",
            flexWrap: "wrap",
            rowGap: "10px",
            marginLeft: "40px",
            marginTop: "10px",
          }}
        >
          {skills.map((skill, index) => (
                <div 
                key={index}
                >
              <Tag
                style={{
                  border: "none",
                  color: "red",
                  fontSize: "15px",
                }}
                closable
                onClose={()=>handleOnClose(index)}
              >
                {skill}{" "}
              </Tag>
            </div>
          ))}
        </div>
        <br />
        <button
          style={{
            marginTop: "10px",
            marginLeft: "40px",
            background: "#F13C20",
            color: "white",
            padding: "4px 15px ",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Skills;
