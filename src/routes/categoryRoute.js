const express = require('express')
const {uploadCategoryImage, addCategory, getCategories, getCategoryById, updateCategoryById, deleteCategoryById} = require('../controller/categories')
const router = express.Router()
const upload = require('../utils/multer')
const {authenticateToken}= require('../middleware/tokenAuth')

router.post('/uploadCategoryImage', authenticateToken, upload.single('categoryImage'), uploadCategoryImage);
router.post('/addCategory', authenticateToken, addCategory);
router.post('/updateCategoryById/:categoryId', authenticateToken, upload.single('categoryImage'), updateCategoryById);
router.delete('/deleteCategoryById/:categoryId', authenticateToken, deleteCategoryById);
router.get('/getCategories', authenticateToken, getCategories);
router.get('/getCategoryById/:categoryId', authenticateToken, getCategoryById);

module.exports = router;
