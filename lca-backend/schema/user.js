const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */


const username = joi.string().min(3).max(20).required()
const password = joi.string().alphanum().min(6).max(40).required()
const email = joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } })
const company = joi.string().min(1).max(40).required()





// 注册表单的验证规则对象
exports.reg_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
    email,
    company
  },
}

exports.verify_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
    email,
  },
}


// 登录表单的验证规则对象
exports.login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
}