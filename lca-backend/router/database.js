const express = require('express')

const router = express.Router()

const databaseHandler = require('../router_handler/database')

router.post('/getfactor_db', databaseHandler.getfactor_db)
router.post('/getfactor_db_fid', databaseHandler.getfactor_db_fid)



module.exports = router