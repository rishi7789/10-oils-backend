const express = require('express')
const {uploadProductImages, addProduct, getProducts, updateProductById, deleteProductById} = require('../controller/product')
const router = express.Router()
const upload = require('../utils/multer')
const {authenticateToken}= require('../middleware/tokenAuth')

router.post('/uploadProductImages', authenticateToken, upload.array('productImages'), uploadProductImages);
router.post('/uploadProduct', authenticateToken, addProduct);
router.get('/getProducts', authenticateToken, getProducts);
router.post('/updateProductById/:productId', authenticateToken, updateProductById);
router.delete('/deleteProductById/:productId', authenticateToken, deleteProductById);

module.exports = router;
