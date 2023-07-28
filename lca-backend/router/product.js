const express = require('express')
const jwt = require('jsonwebtoken')


const router = express.Router()

const productHandler = require('../router_handler/product')




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


// router.post('/get_database',  productHandler.getDB)

router.post('/getfactor_public_private', authenticateToken, productHandler.getfactor_public_private)

router.post('/createNewProduct',  authenticateToken, productHandler.createNewProduct)
router.post('/deleteProduct',authenticateToken,  productHandler.deleteProduct)
router.post('/getAllProduct_uid',authenticateToken,  productHandler.getAllProduct_uid)
router.post('/updateProduct',authenticateToken,  productHandler.updateProduct)
router.post('/publishProduct', authenticateToken, productHandler.publishProduct)
router.post('/duplicateProduct', authenticateToken, productHandler.duplicateProduct)



router.post('/createNewProcess', authenticateToken, productHandler.createNewProcess)
router.post('/deleteProcess',authenticateToken,  productHandler.deleteProcess)
router.post('/updateProcess',authenticateToken,  productHandler.updateProcess)




router.post('/getAllProcess_pid',authenticateToken,  productHandler.getAllProcess_pid)
router.post('/getAllInputOutput_product_id',authenticateToken,  productHandler.getAllInputOutput_product_id)
router.post('/createNewInputOutput',authenticateToken,  productHandler.createNewInputOutput)
router.post('/deleteInputOutput',authenticateToken,  productHandler.deleteInput)
router.post('/updateInputOutput',authenticateToken,  productHandler.updateInputOutput)


router.post('/getFootprint_pid', productHandler.getFootprint_pid)


module.exports = router