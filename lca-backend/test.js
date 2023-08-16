
// const nodemailer = require('nodemailer');
// // const time = require('fecha')



// let transporter = nodemailer.createTransport({
//   // host: 'smtp.qq.email',
//   service: 'Godaddy',
//   host:'smtpout.secureserver.net',
//   secureConnection: true,  //安全方式发送,建议都加上
//   port:465,
//   auth: {
//       user: 'info@ssbti.org',
//       pass: "a0035741018"
//   }
// })


// const mailConfigurations = {
  
//   // It should be a string of sender/server email
//   from: 'info@ssbti.org',

//   to: "markdba313@gmail.com",

//   // Subject of Email
//   subject: '[Action required] Email Verification 邮箱验证',
    
//   // This would be the text of email body
//   text: `Hi! , You have recently visited 
//          our website and entered your email.
//          Please follow the given link to verify your email
//          http://lca.ssbti.org/a
//          Thanks
//          This link will expire in 10 mins. If it expires, please re-verify`
    
// };


// transporter.sendMail(mailConfigurations, function(error, info){
// if (error) {console.log(error)}

// else {
//   console.log('Email Sent Successfully');
//   console.log(info);
//   return res.send({status: 0, message: 'register success, please verify'})
// }

// });

const jwt = require('jsonwebtoken');

let nowInSeconds = Math.floor(Date.now() / 1000);
let payload = {
    aud: 'e78dc489-e37e-4aa3-9247-cd6b214da3e6',
    iss: 'node',
    sub: 'jcg',
    
    timestamp: nowInSeconds,
    nonce: Math.random(),
};

// Creating an access-token
let accessToken = jwt.sign(payload, "mark", { algorithm: 'HS256', expiresIn: '2s' });

console.log(accessToken);