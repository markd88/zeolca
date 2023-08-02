const express = require('express')
const jwt = require('jsonwebtoken')


const router = express.Router()

const databaseHandler = require('../router_handler/database')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.send({status: 2, message: "token error"})
  }
  
  jwt.verify(token, 'MarkDong', (err, user) => {

    if (err) {
      console.log(err)
      return res.send({status: 2, message: "token error"})
    }
    
    req.auth = user

    next()
  })
}




router.post('/getfactor_db', authenticateToken, databaseHandler.getfactor_db)
router.post('/getfactor_db_fid', authenticateToken, databaseHandler.getfactor_db_fid)



module.exports = router