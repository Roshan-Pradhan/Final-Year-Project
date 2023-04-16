import React from "react";
import "./LandingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,faUserPlus,faUsers,faRectangleList, faListOl
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <>
      <div className="MainBody">
        <div className="TEXTBODY">
          <h2>
            <span className="JOBTITLE">JobEzNepal</span> assist
            <br />
            you to find your dream Job
          </h2>
          <h5>
            JobEzNepal is a job portal that recommends
            <br />
            you the best jobs relevant to your qualifications.
            <br />& also provide a platform for job provider to post jobs.
          </h5>
          <div className="BUTTONBODY">
            <Link to='/register'>
            <button className="MAINBUTTON">Register</button>
            </Link >
            <Link to='/login'>
            <button className="MAINBUTTON">LogIn</button>
            </Link>
          </div>
        </div>
        <div className="IMAGEBODY">
          <img alt="jobeznepal" src="/IMAGES/heroimage.png" className="HEROIMAGE" />
        </div>
      </div>
      <div className="INFOSECTION">
        <div className="infoleft">
          <h2 className="jobbs">JOB PROVIDER</h2>
          <div className="provider">
            <div className="howOne">
              <div className="icondesign">
              <FontAwesomeIcon  icon={faUserPlus} size="2xl" />
              </div>
              <h3>Register</h3>
            </div>
            <div className="howOne">
            <div className="icondesign">
              <FontAwesomeIcon  icon={faSquareCheck} size="2xl" />
              </div>
              <h3>Add Jobs</h3>
            </div>
            <div className="howOne">
            <div className="icondesign">
              <FontAwesomeIcon  icon={faUsers} size="2xl" />
              </div>
              <h3>Get Applicants</h3>
            </div>
          </div>
        </div>
        <hr className="hr"/>
        <div className="inforight">
          <h2 className="jobbs">JOB SEEKER</h2>
          <div className="provider">
            <div className="howOne">
            <div className="icondesign">
              <FontAwesomeIcon  icon={faUserPlus} size="2xl" />
              </div>
              <h3>Register</h3>
            </div>
            <div className="howOne">
            <div className="icondesign">
              <FontAwesomeIcon  icon={faRectangleList} size="2xl" />
              </div>
              <h3>Profile Completion</h3>
            </div>
            <div className="howOne">
            <div className="icondesign">
              <FontAwesomeIcon  icon={faListOl} size="2xl" />
              </div>
              <h3>View Jobs</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
