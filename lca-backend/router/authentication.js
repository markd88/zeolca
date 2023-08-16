const db = require('../db/index')
const jwt = require('jsonwebtoken')


exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.send({status: 2, message: "token error"})
  }
  
  jwt.verify(token, 'MarkDong', async (err, user) => {
    
    if (err) {
      console.log(err)
      return res.send({status: 2, message: "token error"})
    }

    let sql = `select * from users where username=?`
    console.log('username', user.username)
    const sql_res = await db.query(sql,[user.username])
    if (sql_res[0].token !== token) {
      return res.send({status: 2, message: "token error"})
    }

    req.auth = user

    next()
  })
}