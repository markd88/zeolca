const express = require('express')
const jwt = require('jsonwebtoken')


const router = express.Router()

const gammaHandler = require('../router_handler/gamma')




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




router.post('/training', authenticateToken, gammaHandler.training)
router.post('/cdp', authenticateToken, gammaHandler.cdp)
router.post('/organization', authenticateToken, gammaHandler.organization)

module.exports = router