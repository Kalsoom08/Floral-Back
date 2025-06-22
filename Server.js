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

//Public Routes
const publicProductsRoute = require('./Routes/Public/productsRoute')

//Admin API's
app.use('/api/admin', adminProductsRoute)
app.use('/api/admin', adminOrdersRoute)

//Public API's
app.use('/api/public', publicProductsRoute)



app.listen(PORT, ()=>{
    console.log('App is Runnning');
})
