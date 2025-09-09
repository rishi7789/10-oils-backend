const Blog = require('../models/blogs');
const { uploadImages } = require('../utils/uploadImages')


const uploadBlogImage = async (req, res) => {
  try {
      const url = await uploadImages(req.file);

    res.json({
      status: 200,
      message: 'Image uploaded',
      imageUrl: url
    });
  } catch (error) {
    console.error('S3 upload error:', error);
    res.status(500).json({ message: 'Failed to upload images', error: error.message });
  }
};


//add
const addBlog = async (req, res) => {
    try {
        const { title, subTitle, descriptionText, image, buttonTitle, buttonLink} = req.body;

        const newBlog = await Blog.create({
            title: title,
            subTitle: subTitle,
            descriptionText: descriptionText,
            image: image,
            buttonTitle: buttonTitle,
            buttonLink: buttonLink
        });

        res.json({
            status: 200,
            message: "Blog added successfully",
            data: newBlog
        });

    } catch (err) {
        console.log('Add blog error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({
            status: 200,
            message: "Blogs fetched successfully",
            data: blogs
        });
    } catch (err) {
        console.log('Get blogs error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        res.json({
            status: 200,
            message: "Blog fetched successfully",
            data: blog
        });
    } catch (err) {
        console.log('Get blog error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { title, subTitle, descriptionText, image, buttonTitle, buttonLink, isActive} = req.body;

        const updateData = {};
        if (title) updateData.title = title;
        if (subTitle) updateData.subTitle = subTitle;
        if (descriptionText) updateData.descriptionText = descriptionText;
        if (image) updateData.image = image;
        if (buttonTitle) updateData.buttonTitle = buttonTitle;
        if (buttonLink) updateData.buttonLink = buttonLink;
        if (req.body.hasOwnProperty('isActive')) {
            updateData.isActive = isActive;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });
        res.json({
            status: 200,
            message: "Blog updated successfully",
            data: updatedBlog
        });
    } catch (err) {
        console.log('Update blog error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        res.json({
            status: 200,
            message: "Blog deleted successfully",
            data: deletedBlog
        });
    } catch (err) {
        console.log('Delete blog error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};


module.exports = { uploadBlogImage, addBlog, getBlogs, getBlogById, updateBlog, deleteBlog };