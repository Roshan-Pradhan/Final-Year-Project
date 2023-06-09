import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import Navbar from "./components/Navbar";
import AllJobs from "./DashBoard/AllJobs";
import Profile from "./DashBoard/Profile";
import VerifyMail from "./Authentication/VerifyMail";
import Home from "./DashBoard/Home";
import CompanyDetails from "./DashBoardProvider/CompanyDetails";
import ProviderJob from "./DashBoardProvider/ProviderJob";
import SingleJobPage from "./JOBPAGES/SingleJobPage";
import CompanyHomePage from "./DashBoardProvider/CompanyHomePage";
import FooterGlobal from "./components/FooterGlobal";
import AppliedJobs from "./DashBoard/AppliedJobs";
import Admin from "./components/Admin";
import ForgetPW from "./Authentication/ForgetPW";
import Unauthorized from "./Authentication/404";

const App = () => {
  const [homeData, setHomeData] = useState("");
  const [fromLogin, setFromLogin] = useState("");
  const [companyInfo, setCompanyInfo] = useState([]);
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const loggedInUser = JSON.parse(
    window.localStorage.getItem("jobeznepalUser")
  );
  // Assuming loggedInUser is the object containing user data
  let loggedInUserType =
    loggedInUser && loggedInUser.doUserExist
      ? loggedInUser.doUserExist.usertype
      : null;

  return (
    <BrowserRouter>
      {isLoggedIn === "true" && (
        <Navbar
          homeData={homeData}
          companyInfo={companyInfo}
          loggedInUserType={loggedInUserType}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={isLoggedIn === "true" ? <Home /> : <LandingPage />}
        ></Route>
        <Route path="/singleJobPage" element={<LandingPage />}></Route>
        <Route path="/forgetPassword" element={<ForgetPW />}></Route>
        <Route
          path="/:any"
          element={isLoggedIn === "true" ? <Home /> : <Unauthorized />}
        ></Route>

        <Route exact path="/register" element={<Register />}></Route>
        <Route
          exact
          path="/login"
          element={<Login setFromLogin={setFromLogin} />}
        ></Route>
        <Route path="/users/:id/verify/:token" element={<VerifyMail />}></Route>
        <Route
          path="/singleJobPage/:jobID"
          element={<SingleJobPage companyInfo={companyInfo} />}
        ></Route>

        {/* to navigate between job provider and seeker */}
        {loggedInUserType === "admin" && (
          <>
            <Route
              path="/listedJobs"
              element={isLoggedIn === "true" ? <Admin /> : <LandingPage />}
            ></Route>
          </>
        )}

        {loggedInUserType === "seeker" && (
          <>
            <Route
              path="/"
              element={isLoggedIn === "true" ? <Home /> : <LandingPage />}
            >
              {" "}
            </Route>
            <Route
              path="/home"
              element={isLoggedIn === "true" ? <Home /> : <LandingPage />}
            >
              {" "}
            </Route>
            <Route
              path="/userProfile"
              element={
                isLoggedIn === "true" ? (
                  <Profile setHomeData={setHomeData} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            ></Route>
            <Route
              path="/alljobs"
              element={isLoggedIn === "true" ? <AllJobs /> : <LandingPage />}
            ></Route>
            <Route
              path="/appliedJobs"
              element={
                isLoggedIn === "true" ? <AppliedJobs /> : <LandingPage />
              }
            ></Route>
          </>
        )}
        {loggedInUserType === "provider" && (
          <>
            <Route
              path="/"
              element={
                isLoggedIn === "true" ? <CompanyHomePage /> : <LandingPage />
              }
            ></Route>
            <Route
              path="/home"
              element={
                isLoggedIn === "true" ? (
                  <CompanyHomePage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            >
              {" "}
            </Route>
            <Route
              path="/userProfile"
              element={
                isLoggedIn === "true" ? (
                  <CompanyDetails setCompanyInfo={setCompanyInfo} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            >
              {" "}
            </Route>
            <Route
              path="/alljobs"
              element={
                isLoggedIn === "true" ? <ProviderJob /> : <LandingPage />
              }
            >
              {" "}
            </Route>
          </>
        )}
      </Routes>
      {isLoggedIn === "true" && loggedInUserType !== "admin" && (
        <FooterGlobal />
      )}
    </BrowserRouter>
  );
};

export default App;
