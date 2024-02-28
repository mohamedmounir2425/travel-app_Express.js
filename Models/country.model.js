const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    _id:{
        type:Number
    },
    countryName:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
        maxLength: 20,
        lowercase:true,
    },
    countryDescription:{
        type:String,
        required:true,
        trim:true,
        minLength: 10,
        lowercase:true,
    },
    countryImg:{
        type:String,
        trim:true,
    }
})
countrySchema.virtual("trips",{
    ref:"Trip",
    localField:"_id",
    foreignField:"countryId"
})
countrySchema.virtual("hotels",{
    ref:"Hotel",
    localField:"_id",
    foreignField:"hotelCountry.countryId"
})

const Country = mongoose.model('Country',countrySchema);
module.exports = Country;