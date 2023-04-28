const express = require ('express');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "userImages")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '_' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })
const router = express.Router();


const {Register, Login, verifyToken, getUser, userMoreInfo, getUserExtraInfo, verifyEMail, educationDetails, getUserEducation, userResume, userResumeData, getCompanyExtraInfo, companyMoreInfo, addJobs, getPostedJobs, getSingleJobs, getOpenedJob, publicCompanyExtraInfo, getRcmndJobs, getUserSkills, getUserQualification, updateProfile, updateCompanyProfile, getPostedJobswithID, editSinglejob, deleteSinglejob} = require ("../controllers/userController")

router.post("/register",Register)
router.get("/users/:id/verify/:token",verifyEMail)
router.post("/login",Login)
router.get("/user/:loggedInUserID",getUser)
router.post("/userMoreInfo",upload.single('profileImg'),userMoreInfo)
router.get("/userExtraInfo/:loggedInUserID",getUserExtraInfo)
router.post("/educationDetails",educationDetails)
router.get("/getUserEducation/:loggedInUserID",getUserEducation)
router.post("/userResume",userResume)
router.get("/userResumeData/:loggedInUserID",userResumeData)

//-------------------------------------------------------------------------------------------------------------
router.post("/companyMoreInfo",upload.single('profileImg'),companyMoreInfo)

router.get("/companyExtraInfo/:loggedInUserID",getCompanyExtraInfo)

router.get("/publicCompanyExtraInfo",publicCompanyExtraInfo)


router.post("/addJobs",addJobs)


router.get("/getPostedJobs/:loggedInUserID",getPostedJobs)
router.get("/getPostedJobswithID/:jobID",getPostedJobswithID)


router.get("/getOpenedJob",getOpenedJob)


router.get("/getSingleJobs/:jobID",getSingleJobs)

router.get("/getRcmndJobs/:jobsID",getRcmndJobs)

router.get("/getUserSkills/:loggedInUserID",getUserSkills)

router.get("/getUserQualification/:loggedInUserID",getUserQualification)


//-------------------------------------------------------EDIT--------------------

router.put("/updateProfile",updateProfile)


router.put("/updateCompanyProfile",updateCompanyProfile)

router.put("/editSinglejob",editSinglejob)

//--------------------------------------------delete

router.delete("/deleteSinglejob/:jobsID",deleteSinglejob)


module.exports = router;