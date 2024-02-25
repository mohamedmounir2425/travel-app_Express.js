require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DB);


// Routes
const countryRoutes = require('./Routes/countries.route');
const hotelRoutes = require('./Routes/hotels.route');
// const userRoutes = require('../routes/user.route')
// const admenRoutes = require('../routes/Admen.route')
app.use('/countries', countryRoutes);
app.use('/hotels', hotelRoutes);


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