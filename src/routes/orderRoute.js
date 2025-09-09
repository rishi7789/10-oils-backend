const express = require('express')
const {getAllOrders, getUserOrders, createOrder} = require('../controller/order')
const router = express.Router()
const {authenticateToken}= require('../middleware/tokenAuth')

router.get('/getAllOrders', authenticateToken, getAllOrders);
router.get('/getUserOrders', authenticateToken, getUserOrders);
router.post('/createOrder', authenticateToken, createOrder);

module.exports = router;
