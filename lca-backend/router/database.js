const express = require('express')
const jwt = require('jsonwebtoken')


const router = express.Router()

const databaseHandler = require('../router_handler/database')

const authenticateToken = require('./authentication')



router.post('/getfactor_db', authenticateToken.authenticateToken, databaseHandler.getfactor_db)
router.post('/getfactor_db_fid', authenticateToken.authenticateToken, databaseHandler.getfactor_db_fid)



module.exports = router