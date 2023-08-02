const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')
const productRouter = require('./router/product')
const databaseRouter = require('./router/database')
const gammaRouter = require('./router/gamma')
const adminRouter = require('./router/admin')
const helmet = require('helmet')
const joi = require('joi')



// const jwt = require('jsonwebtoken')

const config = require('./config/config')

const app = express()
app.use(helmet());
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]

//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, config.env.jwtSecretKey, (err, decoded) => {
//     console.log(err)

//     if (err) return res.sendStatus(403)

//     req.user = user

//     next()
//   })
// }

const expressJWT = require('express-jwt')

// app.use(express.static('images'));


app.use(
  expressJWT(
          { 
            secret: config.env.jwtSecretKey, 
            algorithms: ["HS256"]
          }).unless({ path: [/^\/api\//] }))


// "/api" does not need Authoriation
app.use('/api', [userRouter])



app.use('/auth', [productRouter, gammaRouter,  databaseRouter, adminRouter])


// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) {
    console.log('validation error')
    return res.send({status: 1, message: `form validation error: ${err}`})
  }
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 2,
      message: `jwt token error: ${err}`
    })
  }
  
  // 未知错误
  res.send({status: 1, message: err})
  console.log(err)
  console.log('unknow error in app.js')
})





const port = 8080

app.listen(port, function(){
  console.log(`server running on port ${port}`)
})



// const https = require("https");
// const querystring = require("querystring");
// const url = require("url");
 
// const gamma_port = 10101;
// // 1.创建代理服务
// https.createServer(onRequest).listen(gamma_port, function(){
//   console.log(`server running on port ${gamma_port}`)
// });
 
// function onRequest(req, res) {
//   console.log(req, res)
//   const originUrl = url.parse(req.url);
//   const qs = querystring.parse(originUrl.query);
//   const targetUrl = qs["target"];
//   const target = url.parse(targetUrl);
//   console.log(target)
 
//   const options = {
//     hostname: target.hostname,
//     port: 80,
//     path: url.format(target),
//     method: "GET"
//   };
 
//   // 2.代发请求
//   const proxy = https.request(options, _res => {
//     // 3.修改响应头
//     const fieldsToRemove = ["x-frame-options", "content-security-policy"];
//     Object.keys(_res.headers).forEach(field => {
//       if (!fieldsToRemove.includes(field.toLocaleLowerCase())) {
//         res.setHeader(field, _res.headers[field]);
//       }
//     });
//     _res.pipe(res, {
//       end: true
//     });
//   });

//   req.pipe(proxy, {
//     end: true
//   });
// }