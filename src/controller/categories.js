const Category = require('../models/categories');
const { uploadImages } = require('../utils/uploadImages')


//upload
const uploadCategoryImage = async (req, res) => {
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
const addCategory = async (req, res) => {
    try {
        const { categoryName, categoryImage } = req.body;

        const newCategory = await Category.create({
            categoryName: categoryName,
            categoryImage: categoryImage
        });

        res.json({
            status: 200,
            message: "Category added successfully",
            data: newCategory
        });

    } catch (err) {
        console.log('Add category error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};


//update
const updateCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryName, categoryImage, isActive } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.json({
                status: 400,
                message: "Category not found"
            })
        }

        const updateData = {};
        if (categoryName) updateData.categoryName = categoryName;
        if (categoryImage) updateData.categoryImage = categoryImage;
         if (req.body.hasOwnProperty('isActive')) {
            updateData.isActive = isActive;
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });

        res.status(200).json({
            message: 'Category updated successfully',
            data: updatedCategory
        });

    } catch (err) {
        console.error('Update category error:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


//delete
const deleteCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;

         const category = await Category.findById(categoryId);
        if (!category) {
            return res.json({
                status: 400,
                message: "Category not found"
            })
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        res.status(200).json({
            message: 'Category deleted successfully',
            data: deletedCategory
        });

    } catch (err) {
        console.error('Delete category error:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({
            status: 200,
            message: "Categories fetched successfully",
            data: categories
        });
    } catch (err) {
        console.log('Get categories error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        res.json({
            status: 200,
            message: "Category fetched successfully",
            data: category
        });
    } catch (err) {
        console.log('Get category error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};

module.exports = {
    addCategory,
    updateCategoryById,
    deleteCategoryById,
    uploadCategoryImage,
    getCategories,
    getCategoryById
};
