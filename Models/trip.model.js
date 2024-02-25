const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    tripName:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
        maxLength: 20,
        lowercase:true,
    },
    tripDescription:{
        type:String,
        required:true,
        trim:true,
        minLength: 10,
        maxLength: 100,
        lowercase:true,
    },
    tripPrice:{
        type:Number,
        required:true,
        trim:true,
        min:100,
        max:10000
    },
    tripDate:{
        type:Date,
        required:true,
        trim:true,
    },
    tripImg:{
        type:String,
        trim:true,
    },
    tripCountry:{
        countryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'country'
        },
        countryName:{
            type:String,
            trim:true
        }
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
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hotel'
    },
    offer:{
        type:Number,
    },
    tripCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    tourPlan:{
        day:{
            type:String,
            trim:true,
        }
    },
    included:[String],
    excluded:[String]
},{ timestamps:true})

tripSchema.vertical('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'reviewTrip'
})
tripSchema.vertical('hotel',{
    ref:'Hotel',
    localField:'hotelId',
    foreignField:'_id'
})

const Trip = mongoose.model('Trip',tripSchema)
module.exports = Trip