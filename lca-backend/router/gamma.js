const express = require('express')
const jwt = require('jsonwebtoken')


const router = express.Router()

const gammaHandler = require('../router_handler/gamma')




const authenticateToken = require('./authentication')






router.post('/training', authenticateToken.authenticateToken, gammaHandler.training)
router.post('/cdp', authenticateToken.authenticateToken, gammaHandler.cdp)
router.post('/organization', authenticateToken.authenticateToken, gammaHandler.organization)

module.exports = router