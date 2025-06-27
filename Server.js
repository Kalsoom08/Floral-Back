require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
connectDB();
const app = express();
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT;

//Admin Routes
const adminProductsRoute = require('./Routes/Admin/productsRoute')
const adminOrdersRoute = require('./Routes/Admin/ordersRoute')
const adminReviewsRoute = require('./Routes/Admin/customerReviewRoutes')
const adminContentRoute = require('./Routes/Admin/contentRoutes')

//Public Routes
const publicProductsRoute = require('./Routes/Public/productsRoute')
const publicOrdersRoute = require('./Routes/Public/ordersRoute')
const publicAuthRoute = require('./Routes/Public/authRoutes')
const publicReviewRoute = require('./Routes/Public/customerReviewRoutes')
const publicContactRoute = require('./Routes/Public/contactRoutes')
const publicContentRoute = require('./Routes/Public/contentRoutes')

//Admin API's
app.use('/api/admin', adminProductsRoute)
app.use('/api/admin', adminOrdersRoute)
app.use('/api/admin', adminReviewsRoute)
app.use('/api/admin', adminContentRoute)

//Public API's
app.use('/api/public', publicProductsRoute)
app.use('/api/public', publicOrdersRoute)
app.use('/api/public', publicAuthRoute)
app.use('/api/public', publicReviewRoute)
app.use('/api/public', publicContactRoute)
app.use('/api/public', publicContentRoute)


app.listen(PORT, ()=>{
    console.log('App is Runnning');
})
