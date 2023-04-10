import React, { useEffect, useState } from 'react'
import {BrowserRouter ,Route,Routes,Navigate } from 'react-router-dom'
import LandingPage from "./components/LandingPage"
import Register from './Authentication/Register'
import Login from './Authentication/Login'
import Navbar from './components/Navbar'
import AllJobs from './DashBoard/AllJobs'
import Profile from './DashBoard/Profile'
import VerifyMail from './Authentication/VerifyMail'

const App = () => {

  const [homeData, setHomeData] = useState('')
    const isLoggedIn = window.localStorage.getItem("isLoggedIn")


  return (
    <BrowserRouter>

    {isLoggedIn === "true" && 
    <Navbar homeData={homeData} />
    }
      <Routes>
      <Route path='/' element={isLoggedIn === "true" ? <Navigate to="/home"/> : <LandingPage/>}> </Route>
      <Route exact path="/register" element={<Register/>}> </Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route path='/userProfile' element={isLoggedIn === "true" ? <Profile setHomeData={setHomeData}/> :<Navigate to="/login"/>}> </Route>
      {/* <Route path='/home' element={<Home/>}></Route> */}
      <Route path='/alljobs' element={isLoggedIn === "true" ? <AllJobs/> : <LandingPage/>}> </Route>
      {/* <Route path='/userProfile' element={isLoggedIn === "true" ? <Profile homeData={homeData}/> : <LandingPage/>}></Route> */}
      <Route path="/users/:id/verify/:token" element={<VerifyMail/>}></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App