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


const {Register, Login, verifyToken, getUser, userMoreInfo, getUserExtraInfo, verifyEMail, educationDetails, getUserEducation} = require ("../controllers/userController")

router.post("/register",Register)
router.get("/users/:id/verify/:token",verifyEMail)
router.post("/login",Login)
router.get("/user/:loggedInUserID",verifyToken,getUser)
router.post("/userMoreInfo",upload.single('profileImg'),userMoreInfo)
router.get("/userExtraInfo/:loggedInUserID",getUserExtraInfo)
router.post("/educationDetails",educationDetails)
router.get("/getUserEducation/:loggedInUserID",getUserEducation)



module.exports = router;