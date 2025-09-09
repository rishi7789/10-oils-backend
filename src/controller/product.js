const Product = require('../models/products');
const Category = require('../models/categories');
const upload = require('../utils/multer');
const { uploadImages } = require('../utils/uploadImages');


const uploadProductImages = async (req, res) => {
  try {
    const uploadedUrls = [];
    console.log('Files received:', req.files);

    for (const file of req.files) {
      const url = await uploadImages(file);
      uploadedUrls.push(url);
    }

    res.status(200).json({
      message: 'Images uploaded',
      imageUrls: uploadedUrls
    });
  } catch (error) {
    console.error('S3 upload error:', error);
    res.status(500).json({ message: 'Failed to upload images', error: error.message });
  }
};


const addProduct = async (req, res) => {
  try {
    const { name, categoryId, productVariants } = req.body;

    if (!name || !categoryId || !Array.isArray(productVariants)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const product = new Product({
      name,
      categoryId,
      productVariants
    });

    await product.save();

     await Category.findByIdAndUpdate(categoryId,
      { $inc: { totalProducts: 1 } },
      { new: true }
    );

    res.json({
      status: 200,
      message: 'Product created successfully',
      data: product
    });


  } catch (err) {
    console.error('Add product error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId'); // populate bcz category is a ref in models
    res.json({
      status: 200,
      message: 'Products fetched successfully',
      data: products
    });
  } catch (err) {
    console.error('Get products error:', err);
    res.json({
      status: 500,
      message: 'Internal server error'
    })
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate('categoryId');
    res.json({
      status: 200,
      message: 'Product fetched successfully',
      data: product
    });
  } catch (err) {
    console.error('Get product error:', err);
    res.json({
      status: 500,
      message: 'Internal server error'
    });
  }
};

//update
const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.json({status: 400, message: 'Product ID is required' });
    }

    const { name, categoryId, productVariants, isActive} = req.body;

    const updateData= {};
    if (name) updateData.name = name;
    if (categoryId) updateData.categoryId = categoryId;
    if (productVariants) updateData.productVariants = productVariants;
    if (req.body.hasOwnProperty('isActive')) {
      updateData.isActive = isActive;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      status: 200,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (err) {
    console.error('Update product error:', err);
    res.json({ status: 500, message: 'Internal server error' });
  }
};

//delete
const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

       if (deletedProduct.categoryId) {
      await Category.findByIdAndUpdate(
        deletedProduct.categoryId,
        { $inc: { totalProducts: -1 } }
      );
    }

    if (!deletedProduct) {
      return res.json({ status: 404, message: 'Product not found' });
    }

    res.json({
      status: 200,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (err) {
    console.error('Delete product error:', err);
    res.json({ status: 500, message: 'Internal server error' });
  }
};

module.exports = {
  uploadProductImages,
  addProduct,
  getProducts,
  updateProductById,
  deleteProductById
};
