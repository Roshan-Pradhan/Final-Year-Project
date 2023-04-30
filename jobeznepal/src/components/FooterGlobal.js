import React from "react";
import "./FooterGlobal.css";
import { Link } from "react-router-dom";
import {FacebookOutlined, InstagramOutlined, MailOutlined} from "@ant-design/icons"
const FooterGlobal = () => {
  return (
    <>
      <div className="mainFooter">
        <div className="infoLinks">
          <Link className="footerLink" to="/">About Us</Link>
          <Link className="footerLink" to="/">Contact Us</Link>
          <Link className="footerLink" to="/">Privacy Policy</Link>
          <Link className="footerLink" to="/"> Terms and Conditions</Link>
        </div>
        <div className="copyright">
          <p>&copy; 2023 JobEzNepal. All rights reserved.</p>
        </div>
        <div className="socialmedia">
            <h3>Connect With Us:</h3>
            <div className="socialLinks">
        <Link className="footerLink" to="/"><FacebookOutlined /></Link>
          <Link className="footerLink" to="/"><InstagramOutlined /></Link>
          <Link className="footerLink" to="/"><MailOutlined /></Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default FooterGlobal;
