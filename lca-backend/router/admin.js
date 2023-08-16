const express = require('express')
const jwt = require('jsonwebtoken')


const router = express.Router()

const adminHandler = require('../router_handler/admin')


const authenticateToken = require('./authentication')






router.post('/get_users', authenticateToken.authenticateToken, adminHandler.get_users)
router.post('/approveAccess', authenticateToken.authenticateToken, adminHandler.approveAccess)
router.post('/removeAccess', authenticateToken.authenticateToken, adminHandler.removeAccess)


module.exports = router