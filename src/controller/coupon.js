// controllers/productController.js
const Coupon = require('../models/coupons');

const addCoupon = async (req, res) => {
    try {
        const { couponCode, discountType, discountValue, usabilityLimit, expiryDate } = req.body;

        const existingCoupon = await Coupon.findOne({ couponCode });
        if (existingCoupon) {
            return res.json({
                status: 400,
                message: "Coupon code already exists"
            });
        }

        const newCoupon = await Coupon.create({
            couponCode: couponCode,
            discountType: discountType,
            discountValue: discountValue,
            usabilityLimit: usabilityLimit,
            expiryDate: expiryDate
        });

        res.json({
            status: 200,
            message: "Coupon added successfully",
            data: newCoupon
        });

    } catch (err) {
        console.log('Add coupon error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};

const updateCouponById = async (req, res) => {
    try {
        const { couponId } = req.params;
        const { couponCode, discountType, discountValue, usabilityLimit, expiryDate, isActive } = req.body;

        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
            return res.json({
                status: 400,
                message: "Coupon not found"
            })
        }

        const updateData = {};
        if (couponCode) updateData.couponCode = couponCode;
        if (discountType) updateData.discountType = discountType;
        if (discountValue) updateData.discountValue = discountValue;
        if (usabilityLimit) updateData.usabilityLimit = usabilityLimit;
        if (expiryDate) updateData.expiryDate = expiryDate;
        if (req.body.hasOwnProperty('isActive')) {
            updateData.isActive = isActive;
        }


        const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updateData, { new: true });

        res.json({
            status: 200,
            message: "Coupon updated successfully",
            data: updatedCoupon
        });

    } catch (err) {
        console.log('Update coupon error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
}

const deleteCouponById = async (req, res) => {
    try {
        const { couponId } = req.params;

        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
            return res.json({
                status: 400,
                message: "Coupon not found"
            })
        }

        const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

        res.json({
            status: 200,
            message: 'Coupon deleted successfully',
            data: deletedCoupon
        });

    } catch (err) {
        console.error('Delete coupon error:', err);
        res.json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();

        if (!coupons) {
            return res.json({
                status: 400,
                message: "Coupons not found"
            })
        }

        res.json({
            status: 200,
            message: "Coupons fetched successfully",
            data: coupons
        });
    } catch (err) {
        console.error('Get coupons error:', err);
        res.json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

const getCouponById = async (req, res) => {
    try {
        const { couponId } = req.params;
        const coupon = await Coupon.findById(couponId);
        res.json({
            status: 200,
            message: "Coupon fetched successfully",
            data: coupon
        });
    } catch (err) {
        console.log('Get coupon error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};

module.exports = {
    addCoupon,
    updateCouponById,
    deleteCouponById,
    getCoupons,
    getCouponById
};
