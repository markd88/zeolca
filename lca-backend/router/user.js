const express = require('express')

const router = express.Router()

const userHandler = require('../router_handler/user')

const expressJoi = require('@escook/express-joi')

const { reg_schema, login_schema, verify_schema }  = require('../schema/user')

// 注册新用户
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
router.post('/reguser', expressJoi(reg_schema), userHandler.regUser)

// router.post('/re-verify', expressJoi(verify_schema), userHandler.reVerify)


// router.post('/recovery', userHandler.recovery)


router.post('/login', expressJoi(login_schema), userHandler.login)


router.get('/test', (req, res) => {
  console.log('test')
  return res.send({status: 1, message: req.body})
})

// router.get('/verify/:token', userHandler.verify)

module.exports = router