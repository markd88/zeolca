const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const nodemailer = require('nodemailer');
// const time = require('fecha')



// let transporter = nodemailer.createTransport({
//   // host: 'smtp.qq.email',
//   //service: 'Godaddy',
//   host:'ssbti.net',
//   //secureConnection: true,  //安全方式发送,建议都加上
//   port:465,
//   auth: {
//       user: 'info@ssbti.net',
//       pass: "a0035741018"
//   }
// })

// exports.regUser =  async (req, res) => {
//   try {
//     const userinfo = req.body
//     console.log(userinfo)
//     // check the uniqueness of email
//     const sql =  `select * from users where email=?`
//     const check_res = await db.query(sql, userinfo.email)
//     console.log(check_res)
//     if (check_res.length != 0) {
//       return res.send({status: 3, message: `this email has been used, please login`})
//     }

//     const check_username = await db.query(`select * from users where username=?`, userinfo.username)
//     if (check_username.length != 0 ) {
//        return res.send({status: 3, message: "this username has been used, please use another one"})
//      }

//     const user = {
//       'username': userinfo.username, 
//       'company': userinfo.company,
//       "email": userinfo.email,
//     }
//     const tokenStr = jwt.sign(user, config.env.jwtSecretKey, {
//       expiresIn: '10m', // token 有效期为 10 min
//     })

//     const mailConfigurations = {
  
//       // It should be a string of sender/server email
//       from: 'info@ssbti.net',
    
//       to: userinfo.email,
    
//       // Subject of Email
//       subject: '[Action required] Email Verification 邮箱验证',
        
//       // This would be the text of email body
//       text: `Hi! ${userinfo.username}, You have recently visited 
//              our website and entered your email.
//              Please follow the given link to verify your email
//              https://lca.ssbti.org/api/verify/${tokenStr} 
//              Thanks
//              This link will expire in 10 mins. If it expires, please re-verify`
        
//   };


//   transporter.sendMail(mailConfigurations, async function(error, info){
//     if (error) {console.log(error)}
    
//     else {

//       const sql_1 = `insert into users (username, password, email, company, createTime, recentTime ,verify) values (?,?,?,?,?,?,?)`
//       // const createTime = time.format('YYYY-MM-DD HH:mm:ss')
//       const createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
//       const db_result = await db.query(sql_1, [userinfo.username, userinfo.password, userinfo.email, userinfo.company, createTime, createTime ,0 ])
//       console.log(db_result)
//       if (db_result.affectedRows != 1) {
//         return res.send({ status: 1, message: '注册用户失败，请稍后再试！ this is a backend, database error' })
//       }
//       console.log('Email Sent Successfully');
//       console.log(info);
//       return res.send({status: 0, message: 'register success, please verify'})
//     }

//   });



//   } catch (err) {
//     return res.send({
//       status: 1,
//       message: err.message,
//     })
//   }
// }






// exports.reVerify =  async (req, res) => {
//   try {
//     const userinfo = req.body
//     console.log(userinfo)
//     // check the uniqueness of email
//     const sql =  `select * from users where email=?`
//     const check_res = await db.query(sql, userinfo.email)
//     console.log(check_res)
//     if (check_res.length != 1) {
//       return res.send({status: 3, message: `There is no account associated with this email, please sign up`})
//     }
//     const target = check_res[0]
//     if (target.username !== userinfo.username || target.password !== userinfo.password) {
//       return res.send({status: 4, message: `username or password wrong`})
//     }

//     const user = {
//       'username': userinfo.username, 
//       'company': userinfo.company,
//       "email": userinfo.email,
//     }

//     const tokenStr = jwt.sign(user, config.env.jwtSecretKey, {
//       expiresIn: '10m', // token 有效期为 10 min
//     })

//     const mailConfigurations = {
  
//       // It should be a string of sender/server email
//       from: 'info@ssbti.net',
    
//       to: userinfo.email,
    
//       // Subject of Email
//       subject: '[Action required] Email Verification 邮箱验证',
        
//       // This would be the text of email body
//       text: `Hi! ${userinfo.username}, You have recently visited 
//              our website and entered your email.
//              Please follow the given link to verify your email
//              http://lca.ssbti.org/api/verify/${tokenStr} 
//              Thanks
//              This link will expire in 10 mins. If it expires, please re-verify`
        
//   };


//   transporter.sendMail(mailConfigurations, function(error, info){
//     if (error) {
//       console.log(error);
//       return res.send({status: 1, message: 'email send fail'})
//     }
    
//     else {
//       console.log('Email Sent Successfully');
//       console.log(info);
//       return res.send({status: 0, message: 'verification code success'})
//     }

//   });



//   } catch (err) {
//     return res.send({
//       status: 1,
//       message: err.message,
//     })
//   }
// }



// exports.recovery = async (req, res) => {
//   try{
//     const userinfo = req.body
//     email

//   } catch (err) {
//     return res.send({status: 1, message: err.message})
//   }
// }

// exports.verify = async (req, res) => {
//   const {token} = req.params;

//   jwt.verify(token, config.env.jwtSecretKey, async function(err, decoded) {
//     if (err) {
//         console.log(err);
//         return res.send(`Email verification failed, possibly the link is invalid or expired`);
//     }
//     else {
//         console.log(decoded)
//         const sql = `update users set verify=? where email=?`
//         const db_res = await db.query(sql, [1, decoded.email])
//         console.log(db_res)
//         return res.send({status: 0, message: "Email verifified successfully, Please go and log in" });
//     }
// });



// }


exports.regUser =  async (req, res) => {
  try {
    const userinfo = req.body
    console.log(userinfo)
    // check the uniqueness of email
    const sql =  `select * from users where email=?`
    const check_res = await db.query(sql, userinfo.email)
    console.log(check_res)
    if (check_res.length != 0) {
      return res.send({status: 3, message: `this email has been used, please login`})
    }

    const check_username = await db.query(`select * from users where username=?`, userinfo.username)
    if (check_username.length != 0 ) {
       return res.send({status: 3, message: "this username has been used, please use another one"})
     }

    // const user = {
    //   'username': userinfo.username, 
    //   'company': userinfo.company,
    //   "email": userinfo.email,
    // }
    // const tokenStr = jwt.sign(user, config.env.jwtSecretKey, {
    //   expiresIn: '10m', // token 有效期为 10 min
    // })


  const sql_1 = `insert into users (username, password, email, company, createTime, recentTime ,verify) values (?,?,?,?,?,?,?)`
  // const createTime = time.format('YYYY-MM-DD HH:mm:ss')
  const createTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }).slice(0, 19).replace('T', ' ');
  const db_result = await db.query(sql_1, [userinfo.username, userinfo.password, userinfo.email, userinfo.company, createTime, createTime , 0 ])
  console.log(db_result)
  if (db_result.affectedRows != 1) {
    return res.send({ status: 1, message: '注册用户失败，请稍后再试！ this is a backend, database error' })
  }
 // console.log('Email Sent Successfully');

  return res.send({status: 0, message: '已提交！ Application Submitted！ 請等待通知！'})

  } catch (err) {
    return res.send({
      status: 1,
      message: err.message,
    })
  }
}


// exports.logout = async (req, res) => {
//   try {
//     const userinfo = req.body
//     const sql = `select * from users where username=?`
//     const login_results = await db.query(sql, userinfo.username)
//     if (login_results.length !== 1) return res.send({status: 1, message: '后端数据库操作失败！'})
//     if (login_results[0].password !== userinfo.password) {
//       return res.send({status: 1, message: '密码错误！'})
//     }
//     if (Number(login_results[0].verify) !== 1) {
//       console.log(login_results);
//       return res.send({status: 1, message: '请等待ssbti管理员审核账户'})
//     }
//     const login_res = login_results[0]
//     const user = {
//       'username': login_res.username, 
//       'company': login_res.company,
//       "id": login_res.id,
//       "email": login_res.email,
//     }
//     const tokenStr = jwt.sign(user, config.env.jwtSecretKey, {
//       expiresIn: '10h', // token 有效期为 1 个小时
//     })
//     const login_time_update = `update users set recentTime = ? where username=?`
//     const recentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
//     const recentTime_results = await db.query(login_time_update, [recentTime, userinfo.username])
//     // console.log(recentTime_results.affectedRows)
//     if (recentTime_results.affectedRows !== 1) return res.send({status: 1, message: '后端数据库操作失败！'})
//     return res.send({
//           status: 0,
//           message: '登录成功！',
//           // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
//           token: tokenStr,
//         })

//   } catch( err ) {
//     return res.send({status: 1, message: `login fail with error ${err}`})
//   }
// }



exports.login = async (req, res) => {
  try {
    const userinfo = req.body
    const sql = `select * from users where username=?`
    const login_results = await db.query(sql, userinfo.username)
    if (login_results.length !== 1) return res.send({status: 1, message: '后端数据库操作失败！'})
    if (login_results[0].password !== userinfo.password) {
      return res.send({status: 1, message: '密码错误！'})
    }
    if (Number(login_results[0].verify) !== 1) {
      console.log(login_results);
      return res.send({status: 1, message: '请等待ssbti管理员审核账户'})
    }
    const login_res = login_results[0]
    const user = {
      username: login_res.username, 
      company: login_res.company,
      id: login_res.id,
      email: login_res.email,
      timestamp: Math.floor(Date.now() / 1000), // Include a timestamp to make each token unique
      nonce: Math.random(),  // Include a random value as a nonce
    }
    const tokenStr = jwt.sign(user, config.env.jwtSecretKey, {
      expiresIn: '1h', // token 有效期为 1 个小时
    })
    const login_time_update = `update users set recentTime=?, token=? where username=?`
    const recentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }).slice(0, 19).replace('T', ' ');
    const recentTime_results = await db.query(login_time_update, [recentTime, tokenStr, userinfo.username])
    // console.log(recentTime_results.affectedRows)
    if (recentTime_results.affectedRows !== 1) return res.send({status: 1, message: '后端数据库操作失败！'})



    return res.send({
          status: 0,
          message: '登录成功！',
          // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
          token: tokenStr,
        })

  } catch( err ) {
    return res.send({status: 1, message: `login fail with error ${err}`})
  }
}


