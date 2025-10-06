const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const categoryRoutes = require('./routes/categoryRoute');
const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');
const couponRoutes = require('./routes/couponRoute');
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');
const blogRoutes = require('./routes/blogRoute');
const reviewRoutes = require('./routes/reviewRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use('/10oils', categoryRoutes);
app.use('/10oils', userRoutes);
app.use('/10oils', adminRoutes);
app.use('/10oils', couponRoutes);
app.use('/10oils', productRoutes);
app.use('/10oils', orderRoutes);
app.use('/10oils', blogRoutes);
app.use('/10oils', reviewRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Connection error:', err);
});

