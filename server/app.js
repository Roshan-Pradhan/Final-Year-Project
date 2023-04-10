const express = require("express");
require('dotenv').config();
const cors  = require('cors')
const cookieParser = require('cookie-parser')
const  bodyParser = require('body-parser')
const { default: mongoose } = require("mongoose");
const router = require ("./routes/userRoutes");


const app= express();
const port = 8001;
app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/userImages',express.static('userImages'))

// Database correction

 mongoose.connect("mongodb://0.0.0.0:27017/jobeznepal",{useNewUrlParser: true,
 useUnifiedTopology: true}).then(()=>{
     console.log("Database successfully connected")
 })
 .catch((err)=>console.log(err));

//to communicate between different url

app.use(
    cors({
    credentials: true,
    origin:"http://localhost:3000",
}));

app.use(express.json({ limit: "5mb" }));

// this should be coded after  above json code

app.use("/api", router);


app.listen(port, () => {
    console.log("Our App is running on", port);
  });