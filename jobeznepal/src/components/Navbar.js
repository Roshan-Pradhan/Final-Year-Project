import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassArrowRight,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ homeData,loggedInUserType }) => {
  const [burgerClick, setBurgerClick] = useState(false);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  return (
    <>
    {loggedInUserType === "seeker" &&
      <> 
 {/* //JOB SEEKER------------------------------------------------------------------------- */}
 <div className="MainBar">
 <div className="LogoBar">
   <Link to="/" className="LogoBarItems">
     <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} size="xl" />
     <h5>JobEzNepal</h5>
   </Link>
 </div>
 <div className="MenuBar ">
   <NavLink
     to="/home"
     className="MenuHome"
     style={({ isActive }) =>
       isActive
         ? {
             color: "red",
             borderBottom: "2px solid red",
             borderRadius: "2px",
           }
         : { color: "black" }
     }
   >
     Home
   </NavLink>
   <NavLink
     to="/alljobs"
     className="MenuHome"
     style={({ isActive }) =>
       isActive
         ? {
             color: "red",
             borderBottom: "2px solid red",
             borderRadius: "2px",
           }
         : { color: "black" }
     }
   >
     Jobs
   </NavLink>
   <NavLink
     to="/userProfile"
     className="MenuHome"
     style={({ isActive }) =>
       isActive
         ? {
             color: "red",
             borderBottom: "2px solid red",
             borderRadius: "2px",
           }
         : { color: "black" }
     }
   >
     Profile
   </NavLink>
 </div>
 <div className=" MenuBarProfile">
   {/* {loggedInUserExtraData.length > 0 && (
     <NavLink
       to="/"
       className="MenuHome"
       style={({ isActive }) =>
         isActive ? { color: "red" } : { color: "black" }
       }
     >
       Profile
     </NavLink>
   )} */}
   {homeData && (
     <img
       src={`http://localhost:8001${homeData.finduserExtraData.profileImg}`}
       style={{ width: "40px", height: "40px", borderRadius: "50%" }}
       alt="img"
     />
   )}
   <NavLink
     to="/logout"
     className="MenuHome"
     style={({ isActive }) =>
       isActive ? { color: "red" } : { color: "black" }
     }
     onClick={() => logOut()}
   >
     Logout
   </NavLink>
 </div>

 <div
   className="MobileMenu"
   onClick={() => setBurgerClick(!burgerClick)}
 >
   {burgerClick === false ? (
     <>
       <FontAwesomeIcon icon={faBars} size="xl" />
     </>
   ) : (
     <>
       <FontAwesomeIcon icon={faXmark} size="xl" />
     </>
   )}
 </div>
</div>
</>
}
{loggedInUserType === "provider" &&
      <>
      <div className="MainBar">
 <div className="LogoBar">
   <Link to="/" className="LogoBarItems">
     <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} size="xl" />
     <h5>JobEzNepal</h5>
   </Link>
 </div>
 <div className="MenuBar ">
   <NavLink
     to="/home"
     className="MenuHome"
     style={({ isActive }) =>
       isActive
         ? {
             color: "red",
             borderBottom: "2px solid red",
             borderRadius: "2px",
           }
         : { color: "black" }
     }
   >
     Home
   </NavLink>
   <NavLink
     to="/alljobs"
     className="MenuHome"
     style={({ isActive }) =>
       isActive
         ? {
             color: "red",
             borderBottom: "2px solid red",
             borderRadius: "2px",
           }
         : { color: "black" }
     }
   >
     Jobs
   </NavLink>
   <NavLink
     to="/userProfile"
     className="MenuHome"
     style={({ isActive }) =>
       isActive
         ? {
             color: "red",
             borderBottom: "2px solid red",
             borderRadius: "2px",
           }
         : { color: "black" }
     }
   >
     Profile
   </NavLink>
 </div>
 <div className=" MenuBarProfile">
   {/* {loggedInUserExtraData.length > 0 && (
     <NavLink
       to="/"
       className="MenuHome"
       style={({ isActive }) =>
         isActive ? { color: "red" } : { color: "black" }
       }
     >
       Profile
     </NavLink>
   )} */}
   {homeData && (
     <img
       src={`http://localhost:8001${homeData.findCompanyExtraData.profileImg}`}
       style={{ width: "40px", height: "40px", borderRadius: "50%" }}
       alt="img"
     />
   )}
   <NavLink
     to="/"
     className="MenuHome"
     style={({ isActive }) =>
       isActive ? { color: "red" } : { color: "black" }
     }
     onClick={() => logOut()}
   >
     Logout
   </NavLink>
 </div>

 <div
   className="MobileMenu"
   onClick={() => setBurgerClick(!burgerClick)}
 >
   {burgerClick === false ? (
     <>
       <FontAwesomeIcon icon={faBars} size="xl" />
     </>
   ) : (
     <>
       <FontAwesomeIcon icon={faXmark} size="xl" />
     </>
   )}
 </div>
</div>

      </>
}
   



      {burgerClick === true ? (
        <>
          <div className="MenuBarMobile">
            <NavLink
              to="/home"
              style={({ isActive }) =>
                isActive
                  ? { color: "red", fontSize: "18px" }
                  : { color: "black" }
              }
            >
              Home
            </NavLink>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default Navbar;
