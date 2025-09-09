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
app.use('/11oils', categoryRoutes);
app.use('/11oils', userRoutes );
app.use('/11oils', adminRoutes );
app.use('/11oils', couponRoutes );
app.use('/11oils', productRoutes );
app.use('/11oils', orderRoutes );
app.use('/11oils', blogRoutes );
app.use('/11oils', reviewRoutes );

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Connection error:', err);
});

