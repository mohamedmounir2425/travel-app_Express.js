require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DB);


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// Routes
const countryRoutes = require('./Routes/countries.route');
const hotelRoutes = require('./Routes/hotels.route');
const userRoutes = require('./Routes/users.route')
const tripsRoutes = require('./Routes/trips.route');
const adminRoutes = require('./Routes/admin.route')
app.use('/countries', countryRoutes);
app.use('/hotels', hotelRoutes);
app.use('/users', userRoutes);
app.use('/trips',tripsRoutes);
app.use('/admin',adminRoutes)

// Error handler
app.all("*",(req,res)=>{
    res.status(404).send({
        apiStatus:false,
        data:null,
        message:"route Not Found"
    })
})

// Run server
app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
})