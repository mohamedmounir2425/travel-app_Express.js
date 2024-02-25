const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
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
            type:mongoose.Schema.Types.ObjectId,
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

hotelSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'reviewHotel'
})
hotelSchema.virtual('trips',{
    ref:'Trip',
    localField:'_id',
    foreignField:'hotelId'
})

const Hotel = mongoose.model('Hotel',hotelSchema);
module.exports = Hotel;