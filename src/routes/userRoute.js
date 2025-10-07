const express = require('express')
const { CreateUser, LoginUser, getUser, uploadUserImage, updateUser } = require('../controller/user')
const router = express.Router()
const upload = require('../utils/multer')
const { authenticateToken } = require('../middleware/tokenAuth')

router.post('/registerUser', CreateUser);
router.post('/loginUser', LoginUser);
router.get('/getUser', authenticateToken, getUser);
router.post('/uploadUserImage', authenticateToken, upload.single('userImage'), uploadUserImage);
router.put('/updateUser', authenticateToken, updateUser);

module.exports = router;
