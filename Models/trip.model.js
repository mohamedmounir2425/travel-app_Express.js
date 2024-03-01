const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    _id:{
        type:Number
    },
    name:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
        maxLength: 20,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minLength: 10,
        maxLength: 100,
        lowercase:true,
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        min:100,
        max:10000
    },
    imgUrl:{
        type:String,
        trim:true,
    },
    countryId:{
        type:Number,
        ref:'country'
    },
    tripRate:{
        type:Number,
        trim:true,
        min:1,
        max:5
    },
    tripAvailability:{
        type:Boolean,
        trim:true,
    },
    tripOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    hotel:{
        id:{
            type:Number,
            ref:'Hotel'
        },
        name:{
            type: String,
            trim:true,
        }
    },
    offer:{
        type:Number,
    },
    categoryName:{
        type:String
    },
    tourPlan:[String],
    include:[String],
    exclude:[String],
    Duration:{
        type:String,
        trim:true
    }
},{ timestamps:true})

// tripSchema.virtual('reviews',{
//     ref:'Review',
//     localField:'_id',
//     foreignField:'reviewTrip'
// })
tripSchema.virtual('hotelData',{
    ref:'Hotel',
    localField:'hotel.id',
    foreignField:'_id'
})

const Trip = mongoose.model('Trip',tripSchema)
module.exports = Trip