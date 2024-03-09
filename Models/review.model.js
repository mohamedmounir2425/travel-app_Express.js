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
    reviewOwnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviewOwnerName:{
        type: String,
        trim: true,
    },
    reviewOwnerImage:{
        type: String,
        default: 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png'
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

// reviewSchema.virtual('reviewOwnerDetails',{
//     ref:'Trip',
//     localField:'_id',
//     foreignField:'tripOwner'
// })

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;