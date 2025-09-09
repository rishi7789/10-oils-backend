const express = require('express')
const {addCoupon, getCoupons, updateCouponById, deleteCouponById, getCouponById} = require('../controller/coupon')
const router = express.Router();
const {authenticateToken}= require('../middleware/tokenAuth')

router.post('/createCoupon', authenticateToken,  addCoupon);
router.get('/getAllCoupons', authenticateToken, getCoupons);
router.post('/updateCouponById/:couponId', authenticateToken, updateCouponById);
router.delete('/deleteCouponById/:couponId', authenticateToken, deleteCouponById);
router.get('/getCouponById/:couponId', authenticateToken, getCouponById);

module.exports = router;
