const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const {authenticateToken}= require('../middleware/tokenAuth')
const {uploadBlogImage, addBlog, getBlogs, getBlogById, updateBlog, deleteBlog} = require('../controller/blogs')

router.post('/uploadBlogImage', authenticateToken, upload.single('blogImage'), uploadBlogImage);
router.post('/addBlog', authenticateToken, addBlog);
router.get('/getBlogs', authenticateToken, getBlogs);
router.get('/getBlogById/:blogId', authenticateToken, getBlogById);
router.post('/updateBlog/:blogId', authenticateToken, updateBlog);
router.delete('/deleteBlog/:blogId', authenticateToken, deleteBlog);

module.exports = router;
