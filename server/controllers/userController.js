
const registeredUser = require("../model/user");
const userProfileData = require("../model/userProfile");
const companyProfile = require("../model/companyProfile")
const userSkillsTraining= require("../model/skills")
const education = require("../model/education");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailToken = require("../model/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

export const Register = async (req, res) => {
  
  const emailRegex = /\S+@\S+\.\S+/;
  const { username, mobilenumber, email, gender, usertype, password } =
    req.body;

  let existingEmail, existingNumber;

  try {
    existingEmail = await registeredUser.findOne({ email });
    existingNumber = await registeredUser.findOne({ mobilenumber });
  } catch (err) {
    console.log(err);
  }

  if (existingEmail) return res.status(400).send(`${email} already exists`);

  if (existingNumber) return res.status(400).send(`${mobilenumber} already exists`);

  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email address");
  }
 
  const hashedpassword = bcrypt.hashSync(password);

  const saveUser = new registeredUser({
    username,
    mobilenumber,
    email,
    gender,
    usertype,
    password: hashedpassword,
  });
  try {

    await saveUser.save();
    //for mail verification
    const token = await new mailToken({
      userId:saveUser._id,
      token:crypto.randomBytes(32).toString("hex")
    }).save();

  const url = `${process.env.BASE_URL}users/${saveUser._id}/verify/${token.token}`;
    await sendEmail(saveUser.email,"Verify EMail",url)
    return res.json({
      Message: `Email with verification link Sent Successfully to ${email}, Please Verify to proceed further.`,
    });
  //--------------
  } catch (error) {
    console.log(error);
  }
};

export const verifyEMail = async(req,res)=>{
  try {
    const user = await registeredUser.findOne({_id:req.params.id});
    // console.log(user,64);

    if(!user) return res.status(400).send({message:"Invalid Token"});

    const token = await mailToken.findOne({
      userId:user._id,
      token:req.params.token
    });

    if(!token) return res.status(400).send({message:"Invalid link"});
    try {
      const idUpdated =   await registeredUser.updateOne({_id: user._id} , {$set:{verified:true}} );
    // console.log(idUpdated,76);
      await token.remove()
     return res.status(200).send({message:"Email Verified Successfully"})
      
    } catch (error) {
      console.log(error)
    }

    
    
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"Internal Server Error"})
  }
}

export const Login = async (req, res) => {
  const { email, password } = req.body;

  const doUserExist = await registeredUser.findOne({ email }).exec();

  if (!doUserExist)
    return res.status(400).send("Sorry! You are not registered");
  if (doUserExist) {
    const checkPassword = await bcrypt.compareSync(
      password,
      doUserExist.password
    );
    if (!checkPassword) {
      return res.status(400).send("Password Wrong!!!");
    }

if(!doUserExist.verified){
  let token = await mailToken.findOne({userId:doUserExist._id})

  if(!token){
  token = await new mailToken({
      userId:doUserExist._id,
      token:crypto.randomBytes(32).toString("hex")
    }).save();
  const sendurl = `${process.env.BASE_URL}users/${doUserExist._id}/verify/${token.token}`;
  await sendEmail(doUserExist.email,"Verify EMail",sendurl);
}
return res.status(400).send(`Email Sent to ${doUserExist.email} Please Verify`)

}

    const token = jwt.sign(
      {
        userID: doUserExist._id,
      },
      process.env.LOGIN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    doUserExist.password = undefined;
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.status(200).json({ doUserExist, token });
  }
  //  return res.status(200).json({Message:"Successfully Logged IN" , doUserExist, token})
};

export const verifyToken = async (req, res, next) => {
  const headers = req.headers.cookie;
  const token = headers.split("=")[1];
  if (!token) {
    window.localStorage.clear();
    res.status(404).json({ Message: "No token found" });
  }
  jwt.verify(String(token), process.env.LOGIN_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ Message: "Invalid Token" });
    }
    req.id = user.userID;
    // console.log(req.id);
  });
  next();
};

export const getUser = async (req, res) => {
  const userId = req.params.loggedInUserID;
  let finduser;
  try {
    finduser = await registeredUser.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }
  if (!finduser) {
    return res.status(404).json({ Message: "User not found" });
  }
  return res.status(200).json({ finduser });
};


export const getUserExtraInfo = async (req, res) => {
  const userId = req.params.loggedInUserID;

  let finduser;
  try {
    finduser = await registeredUser.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }
  const userType = finduser.usertype;
  let finduserExtraData;
  try {
    finduserExtraData = await userProfileData.findOne({loggedInUserID:userId});
  } catch (error) {
    return new Error(error);
  }
  if (!finduserExtraData) {
    return res.status(404).json({ Message: "User not found" });
  }
  return res.status(200).json({ finduserExtraData,userType });
};




export const userMoreInfo = async (req, res) => {

  const saveData = new userProfileData({
    loggedInUserID:req.body.loggedInUserID,
    userName:req.body.userName,
    userEmail:req.body.userEmail,
    userNumber:req.body.userNumber,
    userGender:req.body.usergender,
    userDOB:req.body.userDOB,
    selectedValueProvince:req.body.selectedValueProvince,
    selectedValueDistrict:req.body.selectedValueDistrict,
    selectedValueStreet:req.body.selectedValueStreet,
    profileImg: /userImages/ + req.file.filename,
  });
  try {
    await saveData.save();
    return res.status(200).json({ Message: "Succesfully Submitted" });
  } catch (error) {
    console.log(error);
  }
};

export const educationDetails =async(req,res)=>{

  const {userId,userEducation}= req.body;

  let existingUserDetails = await education.findOne({userId});

  if (existingUserDetails) return res.status(400).send(`Already exists`);

  const saveEducation = new education({
    userId,
    userEducation,
  })
  try {
    await saveEducation.save();
    return res.status(200).json({ Message: "Succesfully Saved" });
  } catch (error) {
    console.log(error)
  }

}

export const getUserEducation = async(req,res)=>{
  const userId = req.params.loggedInUserID;
  let finduser;
  try {
    finduser = await education.findOne({userId:userId});
    console.log(finduser)
  } catch (error) {
    return new Error(error);
  }
  if (!finduser) {
    return res.status(404).json({ Message: "User Education details not found" });
  }
  return res.status(200).json({ finduser });

}

export const userResume = async(req,res)=>{
  const userId = req.body.loggedInUserID;
  let existingUserDetails = await userSkillsTraining.findOne({userId});

  if (existingUserDetails) return res.status(400).send(`Your details already exists`);

  const saveData = new userSkillsTraining({
    loggedInUserID:req.body.loggedInUserID,
    skills:req.body.skills,
    training:req.body.training,
    employee:req.body.employee,
  });
  try {
    await saveData.save();
    return res.status(200).json({ Message: "Succesfully Submitted" });
  } catch (error) {
    console.log(error);
  }
}

export const userResumeData = async(req,res)=>{
  const userId = req.params.loggedInUserID;
  let finduserResume;
  try {
    finduserResume = await userSkillsTraining.findOne({loggedInUserID:userId});
  } catch (error) {
    return new Error(error);
  }
  if (!finduserResume) {
    return res.status(404).json({ Message: "User Education details not found" });
  }
  return res.status(200).json({ finduserResume });

}

//------------------------------------------------------------------------------------------------------------
export const companyMoreInfo = async (req, res) => {
  
  const saveData = new companyProfile({
    loggedInUserID:req.body.loggedInUserID,
    companyName:req.body.companyName,
    companyEmail:req.body.companyEmail,
    companyNumber:req.body.companyNumber,
    companyType:req.body.companyType,
    selectedValueProvince:req.body.selectedValueProvince,
    selectedValueDistrict:req.body.selectedValueDistrict,
    selectedValueStreet:req.body.selectedValueStreet,
    profileImg: /userImages/ + req.file.filename,
  });
  try {
    await saveData.save();
    return res.status(200).json({ Message: "Succesfully Submitted" });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyExtraInfo = async (req, res) => {
  const userId = req.params.loggedInUserID;

  let finduser;
  try {
    finduser = await registeredUser.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }
  const userType = finduser.usertype;

  let findCompanyExtraData;
  try {
    findCompanyExtraData = await companyProfile.findOne({loggedInUserID:userId});
  } catch (error) {
    return new Error(error);
  }
  if (!findCompanyExtraData) {
    return res.status(404).json({ Message: "Company Details not found" });
  }
  return res.status(200).json({ findCompanyExtraData,userType });
};