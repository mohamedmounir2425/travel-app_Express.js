const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    review:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
        maxLength: 500,
        lowercase:true,
    },
    rate:{
        type:Number,
        required:true,
        trim:true,
        min:1,
        max:5
    },
    reviewOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviewTrip:{
        type:Number,
        ref:'Trip'
    },
    reviewHotel:{
        type:Number,
        ref:'Hotel'
    }
},{ timestamps:true})

reviewSchema.virtual('reviewOwnerDetails',{
    ref:'Trip',
    localField:'_id',
    foreignField:'tripOwner'
})

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;