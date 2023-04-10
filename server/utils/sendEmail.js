const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  let transporter = nodemailer.createTransport({
    host:process.env.HOST,
    service: process.env.SERVICE,
    port:Number(process.env.EMAIL_PORT),
    secure:Boolean(process.env.SECURE),
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
    // enable email validation
    emailValidation: true
  });

  let mailOptions = {
    from: process.env.USER,
    to: email,
    subject: subject,
    text: text,
  };
  // send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
};
