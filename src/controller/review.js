const Review = require('../models/reviews');


//add
const addReview = async (req, res) => {
    const userId = req.user.id;

    try {
        const { productId, rating, comment} = req.body;

        const newReview = await Review.create({
            userId: userId,
            productId: productId,
            rating: rating,
            comment: comment
        });

        res.json({
            status: 200,
            message: "Review added successfully",
            data: newReview
        });

    } catch (err) {
        console.log('Add review error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};

//get
const getReviewsByProductId = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({ productId}).populate([
            { path: 'userId', select: '-password' },
        ]);
        res.json({
            status: 200,
            message: "Reviews fetched successfully",
            data: reviews
        });
    } catch (err) {
        console.log('Get reviews error:', err);
        res.json({
            status: 500,
            message: "Internal server error"
        });
    }
};


module.exports = { addReview, getReviewsByProductId };