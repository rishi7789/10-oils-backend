const express = require('express')
const router = express.Router()
const {authenticateToken}= require('../middleware/tokenAuth')
const {addReview, getReviewsByProductId} = require('../controller/review')

router.post('/addReview', authenticateToken, addReview);
router.get('/getReviewsByProductId/:productId', authenticateToken, getReviewsByProductId);

module.exports = router;
