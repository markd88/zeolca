const express = require('express')
const jwt = require('jsonwebtoken')


const router = express.Router()

const adminHandler = require('../router_handler/admin')




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




router.post('/get_users', authenticateToken, adminHandler.get_users)
router.post('/approveAccess', authenticateToken, adminHandler.approveAccess)

router.post('/removeAccess', authenticateToken, adminHandler.removeAccess)


module.exports = router