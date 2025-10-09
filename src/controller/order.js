const Order = require('../models/orders');
const Product = require('../models/products');
const Category = require('../models/categories');
const Coupon = require('../models/coupons');

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            firstName,
            lastName,
            customerEmail,
            customerPhone,
            orderItems,
            totalAmount,
            shippingAddress,
            // orderNotes,
            paymentMethod,
            paymentStatus,
            // deliveryStatus,
            // isPaid,
            // couponId
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.json({ status: 400, message: 'Order items cannot be empty' });
        }

        const totalItems = orderItems.length;


        for (const item of orderItems) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.json({ status: 400, message: 'Product not found' });
            }

            if (product.stock < item.quantity) {
                return res.json({ status: 400, message: 'Insufficient stock for this product variant' });
            }

            // Update product
            product.stock -= item.quantity;

            await product.save();

            // Find matching variant by SKU
            // const variant = product.productVariants.find(v => v.sku === item.sku);
            // if (!variant) {
            //     return res.json({ status: 400, message: `Variant with SKU ${item.sku} not found` });
            // }

            // // Check if stock is sufficient
            // if (variant.stock < item.quantity) {
            //     return res.json({ status: 400, message: 'Insufficient stock for this product variant' });
            // }

            // Deduct stock
            // variant.stock -= item.quantity;


            // await product.save();
        }

        // if (couponId) {
        //     await Coupon.findByIdAndUpdate(couponId,
        //         { $inc: { usabilityLimit: -1 } },
        //         { new: true }
        //     );
        // }

        const newOrder = await Order.create({
            userId,
            firstName,
            lastName,
            customerEmail,
            customerPhone,
            orderItems,
            totalAmount,
            shippingAddress,
            // orderNotes,
            paymentMethod,
            paymentStatus,
            totalItems
            // deliveryStatus,
            // isPaid,
            // couponId
        });

        res.json({
            status: 200,
            message: 'Order created successfully',
            data: newOrder
        });
    } catch (err) {
        console.error(err);
        res.json({
            status: 500,
            message: 'Failed to create order',
            error: err.message
        });
    }
};

const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find().populate([
            { path: 'userId', select: '-password' },
            { path: 'orderItems.productId' },
            { path: 'couponId' }
        ])
        res.json({
            status: 200,
            success: true,
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.json({
            status: 500,
            message: 'Failed to fetch orders',
            error: err.message
        });
    }
};


const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ userId }).populate([    //find({userId}) will return multiple docs matching userId
            { path: 'userId', select: '-password' },
            { path: 'orderItems.productId' },
            { path: 'couponId' }
        ])

        res.json({
            status: 200,
            message: 'User orders fetched successfully',
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.json({
            status: 500,
            message: 'Failed to fetch user orders',
            error: err.message
        });
    }
};

module.exports = { createOrder, getAllOrders, getUserOrders };
