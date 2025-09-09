const express = require('express')
const {CreateAdmin, LoginAdmin, getAdmin, updateAdmin} = require('../controller/admin')
const router = express.Router()
const upload = require('../utils/multer')
const {authenticateToken}= require('../middleware/tokenAuth')

router.post('/registerAdmin', CreateAdmin);
router.post('/loginAdmin', LoginAdmin);
router.get('/getAdmin', authenticateToken, getAdmin);
router.post('/updateAdmin', authenticateToken, upload.single('adminImage'), updateAdmin);

module.exports = router;
