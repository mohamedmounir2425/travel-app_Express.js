const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    _id:{
        type:Number
    },
    hotelName:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
        maxLength: 20,
        lowercase:true,
    },
    hotelDescription:{
        type:String,
        required:true,
        trim:true,
        minLength: 10,
        lowercase:true,
    },
    hotelImages:[String],
    hotelCountry:{
        countryId:{
            type:Number,
            ref:'Country'
        },
        countryName:{
            type:String,
            trim:true
        }
    },
    hotelRate:{
        type:Number,
        trim:true,
        min:1,
        max:5
    }
},{ timestamps:true})

// hotelSchema.virtual('reviews',{
//     ref:'Review',
//     localField:'_id',
//     foreignField:'reviewHotel'
// })
hotelSchema.virtual('trips',{
    ref:'Trip',
    localField:'_id',
    foreignField:'hotel.id'
})

const Hotel = mongoose.model('Hotel',hotelSchema);
module.exports = Hotel;