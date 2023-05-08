import { ExclamationCircleOutlined } from "@ant-design/icons";
import { faMagnifyingGlassArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <>
      <div className="registerPage">
        <div className="LogoBar">
          <Link to="/" className="LogoBarItems">
            <FontAwesomeIcon
              icon={faMagnifyingGlassArrowRight}
              size="xl"
              className="logoIcon"
            />
            <h5>JobEzNepal</h5>
          </Link>
        </div>
        <div className="notfound">
          <ExclamationCircleOutlined className="notallowed" />
          <h3>Unauthorized</h3>
          <Link to="/login">Please! Login to proceed further</Link>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
