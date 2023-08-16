const express = require('express')
const jwt = require('jsonwebtoken')


const router = express.Router()

const productHandler = require('../router_handler/product')


const authenticateToken = require('./authentication')




router.post('/getfactor_public_private', authenticateToken.authenticateToken, productHandler.getfactor_public_private)

router.post('/createNewProduct',  authenticateToken.authenticateToken, productHandler.createNewProduct)
router.post('/deleteProduct',authenticateToken.authenticateToken,  productHandler.deleteProduct)
router.post('/getAllProduct_uid',authenticateToken.authenticateToken,  productHandler.getAllProduct_uid)
router.post('/updateProduct',authenticateToken.authenticateToken,  productHandler.updateProduct)
router.post('/publishProductApprove', authenticateToken.authenticateToken, productHandler.publishProductApprove)
router.post('/publishProductRemove', authenticateToken.authenticateToken, productHandler.publishProductRemove)


router.post('/duplicateProduct', authenticateToken.authenticateToken, productHandler.duplicateProduct)



router.post('/createNewProcess', authenticateToken.authenticateToken, productHandler.createNewProcess)
router.post('/deleteProcess',authenticateToken.authenticateToken,  productHandler.deleteProcess)
router.post('/updateProcess',authenticateToken.authenticateToken,  productHandler.updateProcess)




router.post('/getAllProcess_pid',authenticateToken.authenticateToken,  productHandler.getAllProcess_pid)
router.post('/getAllInputOutput_product_id',authenticateToken.authenticateToken,  productHandler.getAllInputOutput_product_id)
router.post('/createNewInputOutput',authenticateToken.authenticateToken,  productHandler.createNewInputOutput)
router.post('/deleteInputOutput',authenticateToken.authenticateToken,  productHandler.deleteInput)
router.post('/updateInputOutput',authenticateToken.authenticateToken,  productHandler.updateInputOutput)


router.post('/getFootprint_pid', productHandler.getFootprint_pid)


module.exports = router